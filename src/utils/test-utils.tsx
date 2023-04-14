import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import PodcastContext, { PodcastContextType } from '../context/PodcastContext'
import { BrowserRouter } from 'react-router-dom'

const PodcastContextDefaultProps: PodcastContextType = {
  podcastList: null,
  setPodcastList: () => {},
  length: 0,
  chapters: new Map(),
  setChapters: () => {},
  isLoading: false,
  setIsLoading: () => {},
}

function renderWithProviders(
  ui: ReactElement,
  options = {},
  overwriteContextProps = {}
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    const contextProps = {
      ...PodcastContextDefaultProps,
      ...overwriteContextProps,
    }
    return (
      <PodcastContext.Provider value={contextProps}>
        <BrowserRouter>{children}</BrowserRouter>
      </PodcastContext.Provider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

export { renderWithProviders }
