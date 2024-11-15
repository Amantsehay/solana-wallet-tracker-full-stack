import React from 'react';
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

const SolanaConnect = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </WalletModalProvider>
  );
};

export default SolanaConnect;
