import React from 'react';
import './Podcast.css';

type PodcastProps = {
  name: string;
  author: string;
  image: string;
};

function Podcast(props: PodcastProps) {
  const { name, author, image } = props;

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
  );
}

export default Podcast;
