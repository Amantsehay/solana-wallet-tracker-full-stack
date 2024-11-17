import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Landing from './landing.jsx'
import Home from './Components/home.tsx'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CryptoDashboard from './Components/FetchBinance.jsx'
import UndonePage from './Components/UndonePage.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chart" element={<CryptoDashboard />} />
      <Route
        path="*"
        element={<UndonePage title="404 - Page Not Found" message="The page you're looking for doesn't exist." />}
      />
    </Routes>
  </Router>
  )
}

export default App
