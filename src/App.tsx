import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hub from './components/Hub'
import PodcastDetail from './components/PodcastDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/podcast" element={<PodcastDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
