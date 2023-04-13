import { Chapter, PodcastInfo } from './hooks/useFetchPodcastList'

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

export const fetchPodcastChapters = async (id: string) => {
  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode&limit=20`
    )}`
  )
  const data = await response.json()
  const contents = JSON.parse(data.contents)
  const currentChapters = contents.results.slice(1)
  const podcastChapters: Chapter[] = currentChapters.map((chapter: any) => ({
    id: chapter.trackId,
    title: chapter.trackName,
    publishDate: chapter.releaseDate,
    duration: chapter.trackTimeMillis,
    description: chapter.description,
    episode: chapter.episodeUrl,
  }))

  return podcastChapters
}
