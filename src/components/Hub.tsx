import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Podcast from './Podcast';
import './Hub.css';
import PodcastContext from '../context/PodcastContext';
import { useFetchPodcastList } from '../hooks/useFetchPodcastList';

export const Hub: React.FC = () => {
  const { podcastList = [] } = useContext(PodcastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useFetchPodcastList()

  useEffect(() => {
    if (podcastList && podcastList.length > 0) {
      setIsLoading(false);
    }
  }, [podcastList]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredPodcasts = podcastList?.filter((podcast) => {
    const nameMatch = podcast.name.toLowerCase().includes(searchQuery.toLowerCase());
    const artistMatch = podcast.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || artistMatch;
  });

  return (
    <div className="main-cointainer">
      <h1 className="hub-title">Podcaster</h1>
      <div className="search-container">
        <div className="search-counter">{filteredPodcasts && filteredPodcasts.length}</div>
        <input
          className="podcast-search"
          placeholder="Filter podcasts..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="podcast-hub-container">
        {filteredPodcasts && filteredPodcasts.map((podcast) => {
          return (
            <Podcast
              key={podcast.id}
              id={podcast.id}
              name={podcast.name}
              author={podcast.artist}
              image={podcast.image}
            />
          );
        })}
      </div>
      <Link to="/podcast">Go to podcast page</Link>
    </div>
  );
};

export default Hub;