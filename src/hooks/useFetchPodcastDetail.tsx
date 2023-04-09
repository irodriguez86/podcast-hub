import { useState, useEffect, useContext } from 'react'
import { Chapter } from './useFetchPodcastList'
import PodcastContext from '../context/PodcastContext'

export const useFetchPodcastChapters = (id: string): Chapter[] => {
  const { chapters, setChapters } = useContext(PodcastContext)
  const [podcastChapter, setPodcastChapter] = useState<Chapter[]>([])

  useEffect(() => {
    const fetchPodcastChapters = async () => {
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode&limit=20`
          )}`
        )
        const data = await response.json()
        const contents = JSON.parse(data.contents)
        const currentChapters = contents.results.slice(1)
        const podcastChapters: Chapter[] = currentChapters.map(
          (chapter: any) => ({
            id: chapter.trackId,
            title: chapter.trackName,
            publishDate: chapter.releaseDate,
            duration: chapter.trackTimeMillis,
            description: chapter.description,
            episode: chapter.episodeUrl,
          })
        )

        setPodcastChapter(podcastChapters)
        const updatedChapters = chapters.set(id, podcastChapters)
        setChapters(updatedChapters)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPodcastChapters()
  }, [id])

  return podcastChapter
}
