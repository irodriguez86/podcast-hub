import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../utils/test-utils'
import Hub from '../Hub'

jest.mock('../../../hooks/useFetchPodcastList', () => ({
  useFetchPodcastList: jest.fn()
}))

const mockPodcasts = [
  {
    id: '1',
    name: 'Podcast 1',
    artist: 'Artist 1',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Podcast 2',
    artist: 'Artist 2',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Podcast 3',
    artist: 'Artist 3',
    image: 'https://via.placeholder.com/150',
  },
]

describe('Hub', () => {
  test('should render podcasts', () => {
    renderWithProviders(<Hub />, {}, { podcastList: mockPodcasts })

    mockPodcasts.forEach((currMockPodcast) => {
      expect(screen.getByText(currMockPodcast.name)).toBeInTheDocument()
    })
  })

  test('should render the correct number of podcasts when a search query is entered', async () => {
    renderWithProviders(<Hub />, {}, { podcastList: mockPodcasts })

    const searchInput = screen.getByPlaceholderText('Filter podcasts...')
    userEvent.type(searchInput, 'Podcast 1')

    waitFor(() => {
      const searchCounter = screen.getByTestId('search-counter')
      expect(searchCounter).toHaveTextContent('1')
      expect(screen.getByText('Podcast 1')).toBeInTheDocument()
      expect(screen.getByText('Podcast 2')).not.toBeInTheDocument()
    })
  })

  test('should not render any podcast when no podcasts match search query', async () => {
    renderWithProviders(<Hub />, {}, { podcastList: mockPodcasts })

    const searchInput = screen.getByPlaceholderText('Filter podcasts...')
    const query = 'No matching podcasts'
    userEvent.type(searchInput, query)

    waitFor(() => {
      const searchCounter = screen.getByTestId('search-counter')
      expect(searchCounter).toHaveTextContent('0')
    })
  })
})
