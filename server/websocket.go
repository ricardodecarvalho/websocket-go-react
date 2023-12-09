package main

import (
	"encoding/json"
	"log"
)

// processMessage handles incoming WebSocket messages. It first attempts to unmarshal
// the message into a Message struct. If successful, it iterates over all connections
// in the provided channel and forwards the message to each connected client. Errors
// in unmarshalling or writing the message are logged but do not stop processing for
// other connections.
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
