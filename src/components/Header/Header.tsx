import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import PodcastContext from '../../context/PodcastContext'

const Header: React.FC = () => {
  const { isLoading } = useContext(PodcastContext)

  return (
    <div className="header">
      <div className="header__title">
        <Link to="/">Podcaster</Link>
      </div>
      {isLoading && <div className="loading-circle"></div>}
    </div>
  )
}

export default Header
