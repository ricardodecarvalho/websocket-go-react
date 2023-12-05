package main

import (
	"testing"
)

func TestCreateAndGetChannel(t *testing.T) {
	// Testando a criação do canal
	sessionID := "test-session"
	createdChannel := CreateChannel(sessionID)
	if createdChannel == nil {
		t.Error("CreateChannel retornou nil, esperava um objeto Channel")
	}

	// Testando a obtenção do mesmo canal
	obtainedChannel := GetChannel(sessionID)
	if obtainedChannel == nil {
		t.Error("GetChannel retornou nil, esperava um objeto Channel")
	}

	// Verificando se ambos são o mesmo canal
	if createdChannel != obtainedChannel {
		t.Error("GetChannel retornou um canal diferente do criado")
	}
}
