import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hub from './components/Hub'
import PodcastDetail from './components/PodcastDetailView'
import { PodcastProvider } from './context/PodcastContext'

const App = () => {
  return (
    <PodcastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hub />}></Route>
          <Route path="/podcast/:id" element={<PodcastDetail />} />
        </Routes>
      </BrowserRouter>
    </PodcastProvider>
  )
}

export default App
