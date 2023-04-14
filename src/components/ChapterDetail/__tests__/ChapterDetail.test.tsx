import React from 'react'
import { renderWithProviders } from '../../../utils/test-utils'
import ChapterDetail from '../ChapterDetail'
import { screen, waitFor } from '@testing-library/react'

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    podcastId: 'podcast-1',
    chapterId: 'chapter-1',
  }),
}))

const testChapters = [
  {
    id: 'chapter-1',
    title: 'Chapter 1',
    publishDate: '2023-04-15T14:30:00.000Z',
    duration: 10000,
    description: 'Description for Chapter 1',
    episode: 'https://example.com/chapter-1.mp3',
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2',
    publishDate: '2023-04-16T14:30:00.000Z',
    duration: 20000,
    description: 'Description for Chapter 2',
    episode: 'https://example.com/chapter-2.mp3',
  },
]

function setup() {
  const defaultContextProps = {
    chapters: new Map([['podcast-1', testChapters]]),
  }

  return renderWithProviders(<ChapterDetail />, {}, { ...defaultContextProps })
}

describe('ChapterDetail', () => {
  it('should render the chapter title', () => {
    setup()

    const chapterTitle = screen.getByText('Chapter 1')
    expect(chapterTitle).toBeInTheDocument()
  })

  it('should render the chapter description', () => {
    setup()

    const chapterDescription = screen.getByText('Description for Chapter 1')
    expect(chapterDescription).toBeInTheDocument()
  })

  it('should render the chapter audio player', async () => {
    setup()

    const chapterAudioPlayer = screen.getByTestId('chapter-audio')
    expect(chapterAudioPlayer).toBeInTheDocument()
    expect(chapterAudioPlayer.getAttribute('src')).toBe(
      'https://example.com/chapter-1.mp3'
    )
  })
})
