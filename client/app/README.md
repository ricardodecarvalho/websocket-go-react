# Websocket - React

```
yarn
```
```
yarn dev
```



# todo

- Create a channel - ok
-- sessionID - ok
- Your name - ok
-- Be the moderator (se não existe um moderador ainda)

users [
  { uuid, name, isModerator}
]

-- Start

--- Envia lista de usuários para o backend, ele apenas repassa ao front e o front armazena a lista atualizada.

Frontend state

<UserCreate />
<UserActive />
<Poll />
<Votes />
<UserList />

- User logado (client)
- lista de users (client -> server -> client)
- partida (issue) (client -> server -> client)
- Voto por user (client -> server -> client)

-- client -> server -> client
    front envia cada ação individual para o backend replicar.


