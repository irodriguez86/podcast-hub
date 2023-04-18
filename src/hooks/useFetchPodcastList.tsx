import { useContext, useEffect } from 'react'
import PodcastContext from '../context/PodcastContext'
import { fetchPodcastList } from '../api'

export type Chapter = {
  id: string
  title: string
  publishDate: string
  duration: number
  description: string
  episode: string
}

export type PodcastInfo = {
  id: string
  name: string
  artist: string
  image: string
  description: string
  publishDate: string
}

type DataWithTimestamp = {
  podcastInfo: PodcastInfo[]
  timestamp: number
}

const PODCAST_LIST_KEY = 'podcastList'

const saveDataToLocalStorage = (podcastInfo: PodcastInfo[]): void => {
  const timestamp = new Date().getTime()
  const dataWithTimestamp: DataWithTimestamp = { podcastInfo, timestamp }
  localStorage.setItem(PODCAST_LIST_KEY, JSON.stringify(dataWithTimestamp))
}

const retrieveDataFromLocalStorage = (): PodcastInfo[] | null => {
  const dataWithTimestampJSON = localStorage.getItem(PODCAST_LIST_KEY)
  if (!dataWithTimestampJSON) {
    return null
  }
  const dataWithTimestamp: DataWithTimestamp = JSON.parse(dataWithTimestampJSON)
  const now = new Date().getTime()
  if (now - dataWithTimestamp.timestamp > 24 * 60 * 60 * 1000) {
    localStorage.removeItem(PODCAST_LIST_KEY)
    return null
  }
  return dataWithTimestamp.podcastInfo
}

export const useFetchPodcastList = () => {
  const { podcastList, setPodcastList, setIsLoading } =
    useContext(PodcastContext)

  useEffect(() => {
    setIsLoading(true)

    const localPodcastList = retrieveDataFromLocalStorage()

    if (localPodcastList) {
      setPodcastList(localPodcastList)
      setIsLoading(false)
      return
    }

    // If not we get it from a fetch
    const fetchData = async () => {
      try {
        const podcastInfoArray = await fetchPodcastList()
        setPodcastList(podcastInfoArray)
        saveDataToLocalStorage(podcastInfoArray)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return podcastList
}
