import { useState, useEffect } from 'react';
import { Chapter } from './useFetchPodcastList';

export const useFetchPodcastChapters = (id: string): Chapter[] | undefined => {
  const [podcastChapter, setPodcastChapter] = useState<Chapter[]>();

  useEffect(() => {
    const fetchPodcastChapters = async () => {
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode&limit=20`)}`
          );
        const data = await response.json();
        //console.log(data)
        const contents = JSON.parse(data.contents);
        //console.log('contents', contents)
        const chapters = contents.results.slice(1);
        console.log(chapters)

        const podcastChapters: Chapter[] = chapters.map((chapter: any) => ({
          id: chapter.trackId,
          title: chapter.trackName,
          publishDate: chapter.releaseDate,
          duration: chapter.trackTimeMillis 
        }))

        //console.log(podcastChapters)

        setPodcastChapter(podcastChapters);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPodcastChapters();
  }, [id]);

  return podcastChapter;
};

