import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hub from './views/Hub/Hub'
import PodcastDetail from './views/PodcastDetail/PodcastDetail'
import { PodcastProvider } from './context/PodcastContext'
import ChapterDetail from './views/ChapterDetail/ChapterDetail'

const App = () => {
  return (
    <PodcastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hub />}></Route>
          <Route path="/podcast/:id" element={<PodcastDetail />} />
          <Route
            path="/chapter/:podcastId/:chapterId"
            element={<ChapterDetail />}
          />
        </Routes>
      </BrowserRouter>
    </PodcastProvider>
  )
}

export default App
