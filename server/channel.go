package main

import (
	"sync"

	"github.com/gorilla/websocket"
)

// channels mantém um mapeamento de identificadores de sessão para canais
var channels = make(map[string]*Channel)
var channelsMutex = sync.Mutex{}

// createChannel cria um novo canal com um identificador de sessão
func createChannel(sessionID string) *Channel {
	channelsMutex.Lock()
	defer channelsMutex.Unlock()

	channel := &Channel{
		Connections: make(map[*websocket.Conn]bool),
	}

	channels[sessionID] = channel
	return channel
}

// getChannel retorna um canal existente pelo identificador de sessão
func getChannel(sessionID string) *Channel {
	channelsMutex.Lock()
	defer channelsMutex.Unlock()

	channel, exists := channels[sessionID]
	if !exists {
		return nil
	}

	return channel
}
