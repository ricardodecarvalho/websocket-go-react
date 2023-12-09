package main

import (
	"encoding/json"
	"log"
	"net/http"

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

// wsHandler lida com as conexões WebSocket
func wsHandler(w http.ResponseWriter, r *http.Request) {
	sessionID := r.URL.Query().Get("session")
	if sessionID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	channel := getChannel(sessionID)
	if channel == nil {
		channel = createChannel(sessionID)
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

// createUuidlHandler lida com a criação de um novo UUID para a sessão.
func createUuidlHandler(w http.ResponseWriter, r *http.Request) {
	sessionID := uuid.New().String()

	response := map[string]string{"sessionID": sessionID}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
