import { useEffect, useState } from 'react'

export type PodcastInfo = {
  id: number;
  name: string;
  artist: string
  image: string
};


export const useFetchPodcastList = () => {
  const [podcastList, setPodcastList] = useState<PodcastInfo[]>([]);

  useEffect(() => {
    fetch(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    )
      .then((res) => res.json())
      .then((res) => {
        const podcastInfoArray: PodcastInfo[] = res.feed.entry.map((entry: any) => {
          return {
            id: parseInt(entry.id.attributes['im:id']),
            name: entry['im:name'].label,
            artist: entry['im:artist'].label,
            image: entry['im:image'][2].label // We're using the 170x170 image here.
          };
        });
        setPodcastList(podcastInfoArray);
      })
      .catch(console.log)
  }, [])

  return podcastList
}
