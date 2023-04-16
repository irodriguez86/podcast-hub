import React, { useContext, useEffect, useState } from 'react'
import Podcast from '../../components/Podcast/Podcast'
import './Hub.css'
import PodcastContext from '../../context/PodcastContext'
import { useFetchPodcastList } from '../../hooks/useFetchPodcastList'

export const Hub: React.FC = () => {
  const { podcastList = [] } = useContext(PodcastContext)
  const [searchQuery, setSearchQuery] = useState('')
  //TODO: check if we can do this only when podcastlist is null
  useFetchPodcastList()

  const filteredPodcasts = podcastList?.filter((podcast) => {
    const nameMatch = podcast.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const artistMatch = podcast.artist
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return nameMatch || artistMatch
  })

  return (
    <div className="main-cointainer">
      <div className="search-container">
        <div className="search-counter" data-testid="search-counter">
          {filteredPodcasts && filteredPodcasts.length}
        </div>
        <input
          className="podcast-search"
          placeholder="Filter podcasts..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="podcast-hub-container">
        {filteredPodcasts &&
          filteredPodcasts.map((podcast) => {
            return (
              <Podcast
                key={podcast.id}
                id={podcast.id}
                name={podcast.name}
                author={podcast.artist}
                image={podcast.image}
              />
            )
          })}
      </div>
    </div>
  )
}

export default Hub
