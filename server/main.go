package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		return origin == "http://localhost:5173"
	},
}

// Channel representa um canal onde múltiplos usuários podem se conectar
type Channel struct {
	Connections map[*websocket.Conn]bool
	Mutex       sync.Mutex
}

// Channels mantém um mapeamento de identificadores de sessão para canais
var Channels = make(map[string]*Channel)
var ChannelsMutex = sync.Mutex{}

// CreateChannel cria um novo canal com um identificador de sessão
func CreateChannel(sessionID string) *Channel {
	ChannelsMutex.Lock()
	defer ChannelsMutex.Unlock()

	channel := &Channel{
		Connections: make(map[*websocket.Conn]bool),
	}

	Channels[sessionID] = channel
	return channel
}

// GetChannel retorna um canal existente pelo identificador de sessão
func GetChannel(sessionID string) *Channel {
	ChannelsMutex.Lock()
	defer ChannelsMutex.Unlock()

	channel, exists := Channels[sessionID]
	if !exists {
		return nil
	}

	return channel
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	sessionID := r.URL.Query().Get("session")
	if sessionID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	channel := GetChannel(sessionID)
	if channel == nil {
		channel = CreateChannel(sessionID)
	}

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error", err)
		return
	}
	defer ws.Close()

	channel.Mutex.Lock()
	channel.Connections[ws] = true
	channel.Mutex.Unlock()

	defer func() {
		channel.Mutex.Lock()
		delete(channel.Connections, ws)
		channel.Mutex.Unlock()
	}()

	for {
		// Ler a mensagem do cliente
		messageType, message, err := ws.ReadMessage()
		if err != nil {
			log.Println("Read message error", err)
			break
		}

		processMessage(channel, messageType, message)

	}
}

type Message struct {
	UserName string `json:"userName"`
	Value    int    `json:"value"`
}

func processMessage(channel *Channel, messageType int, message []byte) {
	var msg Message
	err := json.Unmarshal(message, &msg)
	if err != nil {
		log.Println("Unmarshal error", err)
		return
	}

	channel.Mutex.Lock()
	defer channel.Mutex.Unlock()

	for connection := range channel.Connections {
		if err := connection.WriteMessage(messageType, message); err != nil {
			log.Println("Write message error", err)
			continue
		}
	}
}

// Handler para criar um novo canal e enviar o sessionID para o frontend
func createChannelHandler(w http.ResponseWriter, r *http.Request) {
	sessionID := uuid.New().String()

	response := map[string]string{"sessionID": sessionID}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/create-channel", createChannelHandler)
	mux.HandleFunc("/ws", wsHandler)

	// Aplicar middleware CORS
	handler := enableCORS(mux)

	log.Fatal(http.ListenAndServe(":8080", handler))
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Definir cabeçalhos CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		// Verificar se a solicitação é para verificar a possibilidade de CORS (método OPTIONS)
		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	})
}
