'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, Trash2, ArrowRight } from 'lucide-react'
import React from 'react'
import CryptoDashboard from './FetchBinance'
import { Link } from 'react-router-dom'

export default function Home() {
  const [activeTab, setActiveTab] = useState('toFollow')
  const [walletsToFollow, setWalletsToFollow] = useState([
    { address: '0x1234...5678', name: 'Wallet 1' },
    { address: '0x5678...9012', name: 'Wallet 2' },
  ])
  const [followedWallets, setFollowedWallets] = useState<{ address: string, name: string }[]>([])
  const [newWalletAddress, setNewWalletAddress] = useState('')
  const [newWalletName, setNewWalletName] = useState('')
  const [selectedWallet, setSelectedWallet] = useState<{ address: string, name: string } | null>(null)

//   const router = router()

  const handleFollow = (wallet) => {
    setFollowedWallets([...followedWallets, wallet])
    setWalletsToFollow(walletsToFollow.filter(w => w.address !== wallet.address))
  }

  const handleAddWallet = () => {
    if (newWalletAddress) {
      setWalletsToFollow([...walletsToFollow, { 
        address: newWalletAddress,
        name: newWalletName ? newWalletName : `Wallet ${walletsToFollow.length + 1}`
      }])
      setNewWalletAddress('')
      setNewWalletName('')
    }
  }

  const handleDelete = (wallet) => {
    setFollowedWallets(followedWallets.filter(w => w.address !== wallet.address))
    setWalletsToFollow([...walletsToFollow, wallet])
  }

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet)
  }

  if (selectedWallet) {
    return <CryptoDashboard />
    // return <CryptoDashboard wallet={selectedWallet} onBack={() => setSelectedWallet(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Amana Wallet Tracker
      </motion.h1>
      
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'toFollow' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveTab('toFollow')}
          >
            Wallets to Follow
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'following' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'toFollow' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Wallets to Follow</h2>
              <p className="text-gray-400 mb-4">Add new wallets or follow existing ones.</p>
              <div className="flex space-x-2 mb-4">
                 <input
                  type="text"
                  placeholder="Enter wallet name"
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  value={newWalletAddress}
                  onChange={(e) => setNewWalletAddress(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                
                <button
                  onClick={handleAddWallet}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </button>
              </div>
              <ul className="space-y-2">
                {walletsToFollow.map((wallet) => (
                  <motion.li
                    key={wallet.address}
                    className="flex justify-between items-center bg-gray-700 p-3 rounded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white">{wallet.name} ({wallet.address})</span>
                    <button
                      onClick={() => handleFollow(wallet)}
                      className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      Follow
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'following' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Followed Wallets</h2>
              <p className="text-gray-400 mb-4">Wallets you are currently following.</p>
              <ul className="space-y-2">
                {followedWallets.map((wallet) => (
                  <motion.li
                    key={wallet.address}
                    className="flex justify-between items-center bg-gray-700 p-3 rounded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to= {"/chart"}>
                    <span className="text-white cursor-pointer flex items-center" onClick={() => handleWalletClick(wallet)}>
                      {wallet.name} ({wallet.address})
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                    </Link>
                    <div className="flex items-center">
                      <Check className="text-green-500 w-5 h-5 mr-2" />
                      <button
                        onClick={() => handleDelete(wallet)}
                        className="text-red-500 hover:text-red-600 focus:outline-none"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}