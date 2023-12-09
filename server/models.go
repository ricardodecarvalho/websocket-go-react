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
	Type  string  `json:"type"`
	Users *[]User `json:"users,omitempty"`
	Vote  *Vote   `json:"vote,omitempty"`
}

type User struct {
	UUID        string `json:"uuid"`
	Name        string `json:"name"`
	IsModerator bool   `json:"isModerator"`
}

type Vote struct {
	User  User `json:"user"`
	Value int  `json:"value"`
}
