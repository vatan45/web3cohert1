import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { generateMnemonic } from "bip39"
import { SolanaWallet } from './components/SolanaWallet'

import { Buffer } from 'buffer';

// Polyfill Buffer for the browser environment
window.Buffer = Buffer;

// import { EthWallet } from './components/EthWallet'

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <button onClick={async function () {
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <input type="text" value={mnemonic}></input>
      <SolanaWallet />
      {/* <EthWallet /> */}

    </>
  )
}

export default App
