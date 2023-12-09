package main

import "net/http"

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
