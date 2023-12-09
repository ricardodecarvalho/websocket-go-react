# Websocket - Go and React

Study project on WebSocket.

## Client
Currently, the Client initiates an exclusive WebSocket connection (by sessionID) and sends a message replicated to all users "logged in" on the same channel.

## Server
The server receives the sessionID, creates a new WebSocket channel or returns an already created one with the same sessionID. It processes and replicates the received messages to the users "logged in" on the channel.
