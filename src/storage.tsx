import { Chapter } from './hooks/useFetchPodcastList'

type DataWithExpiration = {
  data: Chapter[]
  expirationTime: number
}

const LOCAL_STORAGE_KEY = 'podcastChapters'

export const saveDataToLocalStorage = (
  podcastData: Map<string, Chapter[]>
): void => {
  const dataWithExpirationMap: Map<string, DataWithExpiration> = new Map()

  podcastData.forEach((chapters, podcastId) => {
    const dataWithExpiration: DataWithExpiration = {
      data: chapters,
      expirationTime: new Date().getTime() + 24 * 60 * 60 * 1000, // expiration time is 24 hours from now
    }
    dataWithExpirationMap.set(podcastId, dataWithExpiration)
  })

  const dataWithExpirationJSON = JSON.stringify([...dataWithExpirationMap])
  localStorage.setItem(LOCAL_STORAGE_KEY, dataWithExpirationJSON)
}

export const retrieveDataFromLocalStorage = (): Map<
  string,
  Chapter[]
> | null => {
  const dataWithExpirationJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!dataWithExpirationJSON) {
    return null
  }

  const dataWithExpirationArray: [string, DataWithExpiration][] = JSON.parse(
    dataWithExpirationJSON
  )
  const now = new Date().getTime()
  const validDataWithExpirationArray = dataWithExpirationArray.filter(
    ([_, dataWithExpiration]) => {
      return dataWithExpiration.expirationTime >= now
    }
  )

  if (validDataWithExpirationArray.length === 0) {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    return null
  }

  const podcastData = new Map<string, Chapter[]>()
  validDataWithExpirationArray.forEach(([podcastId, dataWithExpiration]) => {
    podcastData.set(podcastId, dataWithExpiration.data)
  })

  return podcastData
}
