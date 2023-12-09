package main

import (
	"sync"

	"github.com/gorilla/websocket"
)

// Channel representa um canal onde múltiplos usuários podem se conectar
type Channel struct {
	Connections map[*websocket.Conn]bool
	Mutex       sync.Mutex
}

type Message struct {
	UserName string `json:"userName"`
	Value    int    `json:"value"`
}
