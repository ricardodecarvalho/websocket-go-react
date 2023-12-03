import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import useWebSocket from 'react-use-websocket'
import './App.css'

const WS_URL = 'ws://localhost:8080/ws'

function App() {

  useWebSocket(WS_URL, {
    onOpen: () => console.log('opened'),
    onClose: () => console.log('closed'),
    onError: (e) => console.log('error', e),
    onMessage: (e) => console.log('message', e),
  })
  

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
