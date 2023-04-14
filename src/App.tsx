import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hub from './views/Hub/Hub'
import PodcastDetail from './views/PodcastDetail/PodcastDetail'
import { PodcastProvider } from './context/PodcastContext'
import ChapterDetail from './components/ChapterDetail/ChapterDetail'
import Header from './components/Header/Header'

const App = () => {
  return (
    <PodcastProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Hub />}></Route>
          <Route path="/podcast/:podcastId/*" element={<PodcastDetail />} />
        </Routes>
      </BrowserRouter>
    </PodcastProvider>
  )
}

export default App
