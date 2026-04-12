import React, { useState } from 'react'
import Header from './components/HeaderAndFooter/Header'
import HeroSection from './components/HeaderAndFooter/HeroSection'
import HomeWhySection from './components/HeaderAndFooter/HomeWhySection'
import Footer from './components/HeaderAndFooter/Footer'
import CardList from './Render/CardList'
import StudentReview from './components/StudentReview'

const App = () => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('favorites')
    const meta = localStorage.getItem('favoritesMeta')
    if (saved) return JSON.parse(saved)
    if (meta) return Object.keys(JSON.parse(meta)).map(Number)
    return []
  })

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const meta = JSON.parse(localStorage.getItem('favoritesMeta') || '{}')
      let next = []
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id)
        delete meta[id]
      } else {
        next = [...prev, id]
        if (!meta[id]) meta[id] = new Date().toISOString()
      }
      localStorage.setItem('favorites', JSON.stringify(next))
      localStorage.setItem('favoritesMeta', JSON.stringify(meta))
      return next
    })
  }

  return (
    <div className="app-fade-in">
      <Header favoritesCount={favorites.length} />
      <HeroSection />
      <CardList favorites={favorites} onToggleFavorite={toggleFavorite} />
      <HomeWhySection />
      <StudentReview />
      <Footer />
    </div>
  )
}

export default App
