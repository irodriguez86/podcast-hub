import React, { useContext } from 'react'
import { Outlet, Route, Routes, useParams } from 'react-router-dom'
import { useFetchPodcastChapters } from '../../hooks/useFetchPodcastChapters'
import PodcastContext from '../../context/PodcastContext'
import PodcastCard from '../../components/PodcastCard/PodcastCard'
import PodcastChapterList from '../../components/PodcastChapterList/PodcastChapterList'
import './PodcastDetail.css'
import ChapterDetail from '../ChapterDetail/ChapterDetail'

const PodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>()
  const { podcastList = [], chapters } = useContext(PodcastContext)
  const currentPodcast = podcastList?.find((podcast) => podcast.id == podcastId)
  const currentChapters = podcastId ? chapters.get(podcastId) : []

  podcastId && !currentChapters && useFetchPodcastChapters(podcastId)

  return (
    <div className="detail-view-container">
      <div className="podcast-card-container">
        {currentPodcast && (
          <PodcastCard
            id={currentPodcast?.id}
            name={currentPodcast?.name}
            artist={currentPodcast?.artist}
            image={currentPodcast?.image}
            description={currentPodcast?.description}
          ></PodcastCard>
        )}
      </div>
      <div className="right-container">
        <Outlet />
        <Routes>
          {currentChapters && (
            <Route
              path="/"
              element={<PodcastChapterList chapters={currentChapters} />}
            />
          )}
          <Route path="chapter/:chapterId" element={<ChapterDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default PodcastDetail
