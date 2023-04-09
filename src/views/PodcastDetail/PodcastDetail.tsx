import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchPodcastChapters } from '../../hooks/useFetchPodcastDetail'
import PodcastContext from '../../context/PodcastContext'
import { Chapter } from '../../hooks/useFetchPodcastList'
import PodcastCard from '../../components/PodcastCard/PodcastCard'
import PodcastChapterList from '../../components/PodcastChapterList/PodcastChapterList'
import './PodcastDetail.css'

const PodcastDetail = () => {
  const { id: podcastId } = useParams<{ id: string }>()
  const { podcastList = [] } = useContext(PodcastContext)
  const currentPodcast = podcastList?.find((podcast) => podcast.id == podcastId)
  const chapters: Chapter[] = podcastId
    ? useFetchPodcastChapters(podcastId)
    : []

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
      <div className="episodes-table-container">
        {!!chapters.length && <PodcastChapterList chapters={chapters} />}
      </div>
    </div>
  )
}

export default PodcastDetail
