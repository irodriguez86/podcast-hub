import { useState, useEffect, useContext } from 'react'
import { Chapter } from './useFetchPodcastList'
import PodcastContext from '../context/PodcastContext'
import {
  retrieveDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../storage'

const PODCAST_CHAPTERS_KEY = 'podcastChapters'

export const useFetchPodcastChapters = (id: string) => {
  const { chapters, setChapters, setIsLoading } = useContext(PodcastContext)
  const [podcastChapter, setPodcastChapter] = useState<Chapter[]>([])

  useEffect(() => {
    setIsLoading(true)

    const localPodcastChaptersMap = retrieveDataFromLocalStorage()
    const localPodcastChapters = localPodcastChaptersMap
      ? localPodcastChaptersMap.get(id)
      : null
    if (localPodcastChaptersMap && localPodcastChapters) {
      setChapters(localPodcastChaptersMap)
      setPodcastChapter(localPodcastChapters)
      setIsLoading(false)
      return
    }

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
        saveDataToLocalStorage(updatedChapters)
        setChapters(updatedChapters)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchPodcastChapters()
  }, [id])

  return podcastChapter
}
