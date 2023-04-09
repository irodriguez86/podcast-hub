import { PodcastInfo } from './hooks/useFetchPodcastList'

export const fetchPodcastList = async (): Promise<PodcastInfo[]> => {
  try {
    const response = await fetch(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    )
    const data = await response.json()
    const podcastInfoArray: PodcastInfo[] = data.feed.entry.map(
      (entry: any) => {
        return {
          id: parseInt(entry.id.attributes['im:id']),
          name: entry['im:name'].label,
          artist: entry['im:artist'].label,
          image: entry['im:image'][2].label,
          description: entry.summary.label,
          publishDate: entry['im:releaseDate'].label,
        }
      }
    )
    return podcastInfoArray
  } catch (error) {
    console.error(error)
    return []
  }
}
