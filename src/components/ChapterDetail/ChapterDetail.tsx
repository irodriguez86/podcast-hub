import React, { FC, useContext } from 'react'
import { useParams } from 'react-router-dom'
import PodcastContext from '../../context/PodcastContext'
import './ChapterDetail.css'

const ChapterDetail: FC = () => {
  const { podcastId, chapterId } = useParams<{
    podcastId: string
    chapterId: string
  }>()
  const { chapters } = useContext(PodcastContext)

  const currentPodcastChapters = podcastId ? chapters?.get(podcastId) : null
  const currentChapter = currentPodcastChapters?.find(
    (chapter) => chapter.id == chapterId
  )

  // Enable HTML interpretation, if the source weren't trustful we could sanitize the data
  const descriptionMarkup = { __html: currentChapter?.description || '' }

  return (
    <div className="episode-container">
      <div className="chapter-title">{currentChapter?.title}</div>
      <div
        className="chapter-description"
        dangerouslySetInnerHTML={descriptionMarkup}
      />
      <div className="chapter-player">
        {currentChapter && (
          <audio src={currentChapter?.episode} controls={true} />
        )}
      </div>
    </div>
  )
}

export default ChapterDetail
