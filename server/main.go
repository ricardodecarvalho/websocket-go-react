package main

import (
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	log.Println("Server running on port 8080")
	mux.HandleFunc("/create-uuid", createUuidlHandler)
	mux.HandleFunc("/ws", wsHandler)

	// Apply middleware CORS
	handler := enableCORS(mux)

	log.Fatal(http.ListenAndServe(":8080", handler))
}
