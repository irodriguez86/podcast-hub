import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Podcast from './Podcast'
import './Hub.css'

const Hub = () => {
  const [podcastList, setPodcastList] = useState([])

  useEffect(() => {
    fetch(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    )
      .then((res) => res.json())
      .then((res) => setPodcastList(res.feed.entry))
      .catch(console.log)
  }, [])

  return (
    <div className="main-cointainer">
      <h1 className="hub-title">Podcaster</h1>
      <div className="podcast-hub-container">
        {podcastList.length > 0 &&
          podcastList.map((podcast) => {
            console.log(podcast)
            return (
              <Podcast
                key={podcast.id.attributes['im:id']}
                name={podcast['im:name'].label}
                author={podcast['im:artist'].label}
                image={podcast['im:image'][2].label}
              />
            )
          })}
      </div>
      <Link to="/podcast">Go to podcast page</Link>
    </div>
  )
}

export default Hub
