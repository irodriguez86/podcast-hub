import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import PodcastContext, {
  PodcastContextType,
} from '../../../context/PodcastContext'
import Header from '../Header'

describe('Header component', () => {
  //TODO: create setup function with browserRouter and providers
  const mockPodcastContext: PodcastContextType = {
    isLoading: false,
    setIsLoading: jest.fn(),
    podcastList: [],
    setPodcastList: jest.fn(),
    length: 0,
    chapters: new Map<string, any>(),
    setChapters: jest.fn(),
  }

  test('renders the app title', () => {
    render(
      <BrowserRouter>
        <PodcastContext.Provider value={mockPodcastContext}>
          <Header />
        </PodcastContext.Provider>
      </BrowserRouter>
    )

    const titleLink = screen.getByRole('link', { name: /podcaster/i })
    expect(titleLink).toBeInTheDocument()
  })

  test('renders a loading indicator when isLoading prop is true', () => {
    render(
      <BrowserRouter>
        <PodcastContext.Provider
          value={{ ...mockPodcastContext, isLoading: true }}
        >
          <Header />
        </PodcastContext.Provider>
      </BrowserRouter>
    )

    const loadingCircle = screen.getByTestId('loading-circle')
    expect(loadingCircle).toBeInTheDocument()
  })

  test('does not render a loading indicator when isLoading prop is false', () => {
    render(
      <BrowserRouter>
        <PodcastContext.Provider
          value={{ ...mockPodcastContext, isLoading: false }}
        >
          <Header />
        </PodcastContext.Provider>
      </BrowserRouter>
    )

    const loadingCircle = screen.queryByTestId('loading-circle')
    expect(loadingCircle).not.toBeInTheDocument()
  })
})
