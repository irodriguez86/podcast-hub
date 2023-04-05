import React from 'react'
import { Link } from 'react-router-dom'
import Podcast from './Podcast'
import './Hub.css'
import { PodcastInfo, useFetchPodcastList } from '../hooks/useFetchPodcastList'

const Hub: React.FC = () => {
  const podcastList: PodcastInfo[] = useFetchPodcastList();

  return (
    <div className="main-cointainer">
      <h1 className="hub-title">Podcaster</h1>
      <div className="search-container">
        <div className="search-counter">{podcastList.length}</div>
        <input
          className="podcast-search"
          placeholder="Filter podcasts..."
          type="text"
        />
      </div>
      <div className="podcast-hub-container">
        {podcastList.length > 0 &&
          podcastList.map((podcast) => {
            return (
              <Podcast
                key={podcast.id}
                name={podcast.name}
                author={podcast.artist}
                image={podcast.image}
              />
            )
          })}
      </div>
      <Link to="/podcast">Go to podcast page</Link>
    </div>
  )
}

export default Hub
