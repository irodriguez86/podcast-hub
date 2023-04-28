import React from 'react'
import { screen } from '@testing-library/react'
import PodcastChapterList from '../PodcastChapterList'
import { renderWithProviders } from '../../../utils/test-utils'

const podcastId = 123

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ podcastId: podcastId }),
}))

const testChapters = [
  {
    id: '1',
    title: 'Episode 1',
    publishDate: '2022-01-01',
    duration: 3600000,
    description: 'First episode of the podcast',
    episode: 'https://example.com/episode1.mp3',
  },
  {
    id: '2',
    title: 'Episode 2',
    publishDate: '2022-01-08',
    duration: 7200000,
    description: 'Second episode of the podcast',
    episode: 'https://example.com/episode2.mp3',
  },
]

describe('PodcastChapterList', () => {
  it('displays the correct number of episodes', () => {
    renderWithProviders(<PodcastChapterList chapters={testChapters} />)
    const episodesTitle = screen.getByText(/episodes/i)
    expect(episodesTitle).toHaveTextContent('Episodes: 2')
  })
  it('should render the publish date of each episode', () => {
    renderWithProviders(<PodcastChapterList chapters={testChapters} />)
    const episode1PublishDate = screen.getByText('1/1/2022')
    expect(episode1PublishDate).toBeInTheDocument()
    const episode2PublishDate = screen.getByText('8/1/2022')
    expect(episode2PublishDate).toBeInTheDocument()
  })

  it('should render the duration of each episode', () => {
    renderWithProviders(<PodcastChapterList chapters={testChapters} />)
    const episode1Duration = screen.getByText('1:00:00')
    expect(episode1Duration).toBeInTheDocument()
    const episode2Duration = screen.getByText('2:00:00')
    expect(episode2Duration).toBeInTheDocument()
  })

  it('should render the episode link', () => {
    renderWithProviders(<PodcastChapterList chapters={testChapters} />)

    expect(screen.getByRole('link', { name: 'Episode 1' })).toHaveAttribute(
      'href',
      `/podcast/${podcastId}/chapter/${testChapters[0].id}`
    )
  })
})
