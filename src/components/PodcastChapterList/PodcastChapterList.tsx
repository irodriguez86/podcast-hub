import React from 'react'
import { Chapter } from '../../hooks/useFetchPodcastList'
import './PodcastChapterList.css'
import { Link, useParams } from 'react-router-dom'

type PodcastChapterListProps = {
  chapters: Chapter[]
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatDuration(durationMillis: number): string {
  const hours = Math.floor(durationMillis / 3600000)
  const minutes = Math.floor((durationMillis % 3600000) / 60000)
  const seconds = Number(((durationMillis % 60000) / 1000).toFixed(0))
  return `${hours ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`
}

const PodcastChapterList: React.FC<PodcastChapterListProps> = ({
  chapters,
}) => {
  const { podcastId } = useParams<{ podcastId: string }>()

  return (
    <div className="episodes">
      <h2 className="episodes-title">Episodes: {chapters.length}</h2>
      <div className="episodes-list-wrapper">
        <table className="episodes-list">
          <thead>
            <tr>
              <th className="episode-title-header">Title</th>
              <th className="episode-date-header">Date</th>
              <th className="episode-duration-header">Duration</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((chapter, index) => (
              <tr
                key={chapter.id}
                className={
                  index % 2 === 0 ? 'episodes-row-grey' : 'episodes-row-white'
                }
              >
                <td className="episode-title-cell">
                  <Link
                    to={`/podcast/${podcastId}/chapter/${chapter.id}`}
                    className="chapter-link"
                  >
                    {chapter.title}
                  </Link>
                </td>
                <td className="episode-date-cell">
                  {formatDate(chapter.publishDate)}
                </td>
                <td className="episode-duration-cell">
                  {formatDuration(chapter.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PodcastChapterList
