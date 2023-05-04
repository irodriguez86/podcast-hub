import React from 'react'
import './Podcast.css'
import { Link } from 'react-router-dom'

export type PodcastProps = {
  id: string
  name: string
  author: string
  image: string
}

function Podcast(props: PodcastProps) {
  const { id, name, author, image } = props

  return (
    <Link to={`/podcast/${id}`} className="podcast-item-link">
      <div className="podcast-item">
        <div className="podcast-item-image">
          <img src={image} alt={name} />
        </div>
        <div className="podcast-item-content">
          <h2 className="podcast-item-title">{name}</h2>
          <p className="podcast-item-author">Author: {author}</p>
        </div>
      </div>
    </Link>
  )
}

export default Podcast
