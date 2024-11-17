'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { SolanaWalletProvider } from './Components/WalletProvider'
import {SolanaConnect} from "./Components/SolanaConnect"

export default function Component() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => setIsConnecting(false), 2000)
  }

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
      <div>
      <SolanaWalletProvider>
      <SolanaConnect />
    </SolanaWalletProvider> 
      </div>
      

      

    
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