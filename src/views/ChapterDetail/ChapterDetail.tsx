import React, { FC, useContext } from 'react'
import { useParams } from 'react-router-dom'
import PodcastContext from '../../context/PodcastContext'
import { Chapter, PodcastInfo } from '../../hooks/useFetchPodcastList'
import PodcastCard from '../../components/PodcastCard/PodcastCard'
import { PodcastPlayer } from '../../components/ChapterDetail/ChapterPlayer'

const ChapterDetail: FC = () => {
  const { podcastId, chapterId } = useParams<{
    podcastId: string
    chapterId: string
  }>()
  const { podcastList = [], chapters } = useContext(PodcastContext)
  const currentPodcast: PodcastInfo | undefined = podcastList?.find(
    (podcast) => podcast.id == podcastId
  )

  if (typeof currentPodcast === 'undefined') return <div>Loading...</div>

  const currentPodcastChapters = podcastId ? chapters?.get(podcastId) : null
  const currentChapter = currentPodcastChapters?.find(
    (chapter) => chapter.id == chapterId
  )

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
      <div className="episode-container">
        <div className="chapter-title">{currentChapter?.title}</div>
        <div className="chapter-description">{currentChapter?.description}</div>
        <div className="chapter-player">
          {currentChapter && (
            <PodcastPlayer src={currentChapter?.episode}></PodcastPlayer>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterDetail
