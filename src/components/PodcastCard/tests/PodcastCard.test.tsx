import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import PodcastCard from '../PodcastCard'

describe('PodcastCard', () => {
  const props = {
    id: '1',
    name: 'Podcast Name',
    artist: 'Podcast Artist',
    image: 'https://example.com/podcast.png',
    description: 'This is a podcast description',
  }

  test('renders podcast name', () => {
    const { getByText } = render(<PodcastCard {...props} />)
    const podcastName = getByText(props.name)
    expect(podcastName).toBeInTheDocument()
  })

  test('renders podcast artist', () => {
    const { getByText } = render(<PodcastCard {...props} />)
    const podcastArtist = getByText(`by ${props.artist}`)
    expect(podcastArtist).toBeInTheDocument()
  })

  test('renders podcast image', () => {
    const { getByAltText } = render(<PodcastCard {...props} />)
    const podcastImage = getByAltText(props.name)
    expect(podcastImage).toBeInTheDocument()
  })

  test('renders podcast description', () => {
    const { getByText } = render(<PodcastCard {...props} />)
    const podcastDescription = getByText(props.description)
    expect(podcastDescription).toBeInTheDocument()
  })
})
