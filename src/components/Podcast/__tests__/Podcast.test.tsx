import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Podcast, { PodcastProps } from '../Podcast'

const testPodcast: PodcastProps = {
  id: '1',
  name: 'Test Podcast',
  author: 'Test Author',
  image: 'https://testimage.com/test.png',
}

describe('Podcast component', () => {
  it('renders the podcast image', () => {
    render(
      <BrowserRouter>
        <Podcast {...testPodcast} />
      </BrowserRouter>
    )
    const podcastImage = screen.getByAltText('Test Podcast')
    expect(podcastImage).toBeInTheDocument()
    expect(podcastImage).toHaveAttribute(
      'src',
      'https://testimage.com/test.png'
    )
  })

  it('renders the podcast title', () => {
    render(
      <BrowserRouter>
        <Podcast {...testPodcast} />
      </BrowserRouter>
    )
    const podcastTitle = screen.getByText('Test Podcast')
    expect(podcastTitle).toBeInTheDocument()
  })

  it('renders the podcast author', () => {
    render(
      <BrowserRouter>
        <Podcast {...testPodcast} />
      </BrowserRouter>
    )
    const podcastAuthor = screen.getByText('Author: Test Author')
    expect(podcastAuthor).toBeInTheDocument()
  })

  it('renders the podcast link with the correct URL', () => {
    render(
      <BrowserRouter>
        <Podcast {...testPodcast} />
      </BrowserRouter>
    )
    const podcastLink = screen.getByRole('link')
    expect(podcastLink).toHaveAttribute('href', '/podcast/1')
  })
})
