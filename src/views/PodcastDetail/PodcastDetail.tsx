import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchPodcastChapters } from '../../hooks/useFetchPodcastDetail'
import PodcastContext from '../../context/PodcastContext'
import { Chapter, PodcastInfo } from '../../hooks/useFetchPodcastList'
import PodcastCard from '../../components/PodcastCard/PodcastCard'
import PodcastChapterList from '../../components/PodcastChapterList/PodcastChapterList'

const PodcastDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { podcastList = [] } = useContext(PodcastContext)
  console.log('podcastList', podcastList)
  const currentPodcast: PodcastInfo | undefined = podcastList?.find(
    (podcast) => podcast.id == id
  )
  // TODO: check if the current podcast has already the chapters info, if not then fetch them and update the element

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

export default PodcastDetail
