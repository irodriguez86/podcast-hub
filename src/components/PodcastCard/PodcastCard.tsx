import React from 'react'
import './PodcastCard.css'

export type PodcastCardProps = {
  id: string
  name: string
  artist: string
  image: string
  description: string
}

function PodcastCard(props: PodcastCardProps) {
  const { name, artist, image, description } = props

  return (
    <div className="podcast-card">
      <div className="podcast-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="podcast-card-content">
        <h2 className="podcast-card-title">{name}</h2>
        <p className="podcast-card-author">By: {artist}</p>
      </div>
      <div className="podcast-card-description">
        Description: <p>{description}</p>
      </div>
    </div>
  )
}

export default PodcastCard
