import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Landing from './landing.jsx'
import Home from './Components/home.tsx'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CryptoDashboard from './Components/FetchBinance.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chart" element={<CryptoDashboard />} />
    </Routes>
  </Router>
  )
}

export default App
