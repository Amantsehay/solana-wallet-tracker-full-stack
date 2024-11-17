
import { FC } from 'react';
// import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from 'react';
import './wallet.css'
export const SolanaConnect: FC = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </WalletModalProvider>
  );
}