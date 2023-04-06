import { useContext, useEffect, useState } from 'react'
import PodcastContext from '../context/PodcastContext';

export type Chapter = {
  id: string;
  title: string;
  publishDate: string;
  duration: number;
};

export type PodcastInfo = {
  id: string;
  name: string;
  artist: string
  image: string
  description: string
  publishDate: string
  chapters: Chapter[]
};

export const useFetchPodcastList = () => {
  const { podcastList, setPodcastList } = useContext(PodcastContext);

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
            image: entry['im:image'][2].label,
            description: entry.summary.label,
            publishDate: entry['im:releaseDate'].label
          };
        });
        setPodcastList(podcastInfoArray);
      })
      .catch(console.log)
  }, []) 

  return podcastList;
}
