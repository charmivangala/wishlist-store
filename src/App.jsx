import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Toast from './components/Toast.jsx'
import Home from './pages/Home.jsx'
import Wishlist from './pages/Wishlist.jsx'
import useWishlists from './utils/useWishlists.js'

export default function App() {
  const wishlistApi = useWishlists()
  const [toastMessage, setToastMessage] = useState('')

  const showToast = useCallback((message) => setToastMessage(message), [])
  const clearToast = useCallback(() => setToastMessage(''), [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar wishlistCount={wishlistApi.wishlists.length} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home wishlistApi={wishlistApi} showToast={showToast} />} />
          <Route
            path="/wishlists"
            element={<Wishlist wishlistApi={wishlistApi} showToast={showToast} />}
          />
        </Routes>
      </main>
      <Toast message={toastMessage} onClear={clearToast} />
    </div>
  )
}
