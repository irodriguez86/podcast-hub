import React from 'react'
import { Chapter } from '../../hooks/useFetchPodcastList'
import './PodcastChapterList.css'
import { Link, useParams } from 'react-router-dom'
import { formatDate, formatDuration } from '../../utils/date-utils'

type PodcastChapterListProps = {
  chapters: Chapter[]
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
