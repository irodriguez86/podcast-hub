import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchPodcastChapters } from '../hooks/useFetchPodcastDetail'
import PodcastContext from '../context/PodcastContext'
import { Chapter, PodcastInfo } from '../hooks/useFetchPodcastList'
import PodcastCard from './PodcastCard'
import PodcastChapterList from './PodcastChapterList'

const PodcastDetailView = () => {
  const { id } = useParams<{ id: string }>()
  const { podcastList = [] } = useContext(PodcastContext)
  console.log('podcastList', podcastList)
  const currentPodcast: PodcastInfo | undefined = podcastList?.find(
    (podcast) => podcast.id == id
  )
  // TODO: check if the current podcast has already the chapters info, if not then fetch them and update the element

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  function formatDuration(durationMillis: number): string {
    const hours = Math.floor(durationMillis / 3600000)
    const minutes = Math.floor((durationMillis % 3600000) / 60000)
    const seconds = Number(((durationMillis % 60000) / 1000).toFixed(0))
    return `${hours ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`
  }

  if (typeof id === 'undefined') return <div>Loading...</div>

  const chapters: Chapter[] | undefined = useFetchPodcastChapters(id)
  console.log(chapters)

  if (!currentPodcast) return <div>Loading view...</div>

  return (
    <div>
      {currentPodcast && (
        <PodcastCard
          id={currentPodcast?.id}
          name={currentPodcast?.name}
          artist={currentPodcast?.artist}
          image={currentPodcast?.image}
          description={currentPodcast?.description}
        ></PodcastCard>
      )}

      {/* TODO: move this to its own component */}
      {chapters && <PodcastChapterList chapters={chapters} />}
    </div>
  )
}

export default PodcastDetailView
