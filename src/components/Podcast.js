import React from 'react'
import './Podcast.css'

// A component that displays a podcast with its name, author, image and id
function Podcast(props) {
  // Destructure the props object to get the parameters
  const { name, author, image } = props

  // Return the JSX element that renders the podcast
  return (
    <div className="podcast-item">
      <div className="podcast-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="podcast-item-content">
        <h2 className="podcast-item-title">{name}</h2>
        <p className="podcast-item-author">Author: {author}</p>
      </div>
    </div>
  )
}

export default Podcast
