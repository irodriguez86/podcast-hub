import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../utils/test-utils'
import PodcastDetail from '../PodcastDetail'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ podcastId: '1' }),
}))

// mockPodcastList
const mockPodcastList = [
  {
    id: '1',
    name: 'Podcast 1',
    artist: 'Artist 1',
    image: 'image1.jpg',
    description: 'This is podcast 1',
    publishDate: '2022-01-01',
  },
  {
    id: '2',
    name: 'Podcast 2',
    artist: 'Artist 2',
    image: 'image2.jpg',
    description: 'This is podcast 2',
    publishDate: '2022-02-01',
  },
]

// mockChapters
const mockChapters = new Map([
  [
    '1',
    [
      {
        id: '1',
        title: 'Chapter 1',
        publishDate: '2022-01-01',
        duration: 3600,
        description: 'This is chapter 1 of podcast 1',
        episode: 'https://example.com/podcast-1-chapter-1.mp3',
      },
      {
        id: '2',
        title: 'Chapter 2',
        publishDate: '2022-01-02',
        duration: 2700,
        description: 'This is chapter 2 of podcast 1',
        episode: 'https://example.com/podcast-1-chapter-2.mp3',
      },
    ],
  ],
  [
    '2',
    [
      {
        id: '3',
        title: 'Chapter 1',
        publishDate: '2022-02-01',
        duration: 3600,
        description: 'This is chapter 1 of podcast 2',
        episode: 'https://example.com/podcast-2-chapter-1.mp3',
      },
    ],
  ],
])

describe('PodcastDetail', () => {
  it('should render podcast card', () => {
    renderWithProviders(
      <PodcastDetail />,
      {},
      { podcastList: mockPodcastList, chapters: mockChapters }
    )

    expect(screen.getByText('Podcast 1')).toBeVisible()
    expect(screen.getByText(/Artist 1/i)).toBeVisible()
    expect(screen.getByText('This is podcast 1')).toBeVisible()
  })

  it('should render podcast chapters when chapters are available', () => {
    renderWithProviders(
      <PodcastDetail />,
      {
        initialIndex: 1,
        initialEntries: [`podcast/1`],
      },
      {
        podcastList: mockPodcastList,
        chapters: mockChapters,
      }
    )

    expect(screen.getByText('Chapter 1')).toBeInTheDocument()
    expect(screen.getByText('Chapter 2')).toBeInTheDocument()
  })
})
