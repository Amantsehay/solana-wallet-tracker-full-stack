'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, HomeIcon } from 'lucide-react'
import { SolanaWalletProvider } from './Components/WalletProvider'
import { SolanaConnect } from "./Components/SolanaConnect"
import Home from './Components/home'
import { useWallet } from '@solana/wallet-adapter-react'
import { Link } from 'react-router-dom'
export default function Component() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showHome, setShowHome] = useState(false)
  const wallet = useWallet()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

 

 
  wallet.connect().then(() => console.log("Connected!"));

  console.log(wallet)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
      {/* Smoky background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black opacity-50" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-5 blur-1xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 1.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>

      {/* Hero Text */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome to Amana <br />Wallet Tracker App
        </span>
      </motion.h1>

      {/* Wallet Connect */}
      <div className="relative z-10">
        <SolanaWalletProvider wallet= {wallet}>
          <SolanaConnect />
          

        </SolanaWalletProvider>
      </div>

      {/* Show "Go to Home" button if wallet is connected */}
       (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 relative z-10"
        >
          <Link to={"/home"}>
          <button
          label="Go to Home"
            className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Go to Home</span>
          </button>
          </Link>
        </motion.div>
      )

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="text-white text-4xl font-bold"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Amana
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
