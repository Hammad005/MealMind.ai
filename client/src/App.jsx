import React from 'react'
import { Button } from './components/ui/button'
import { ModeToggle } from './components/ui/mode-toggle'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AuthPage from './pages/AuthPage'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/authentication" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App