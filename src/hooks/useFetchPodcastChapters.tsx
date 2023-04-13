import { useState, useEffect, useContext } from 'react'
import { Chapter } from './useFetchPodcastList'
import PodcastContext from '../context/PodcastContext'
import {
  retrieveDataFromLocalStorage,
  saveDataToLocalStorage,
} from '../storage'
import { fetchPodcastChapters } from '../api'

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

    const loadPodcastChapters = async () => {
      try {
        const podcastChapters = await fetchPodcastChapters(id)

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

    loadPodcastChapters()
  }, [id])

  return podcastChapter
}
