import React from 'react';
import './App.css';
import SolanaWalletProvider from './SolanaWalletProvider';
import SolanaConnect from './SolanaConnect';

function App() {
  return (
    <SolanaWalletProvider>
      <div className="App">
        <h1>Solana Wallet Connect Example</h1>
        <SolanaConnect />
      </div>
    </SolanaWalletProvider>
  );
}

export default App;
