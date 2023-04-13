import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { PodcastProvider } from '../context/PodcastContext'
import { BrowserRouter } from 'react-router-dom'

function renderWithProviders(ui: ReactElement, options = {}) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <PodcastProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </PodcastProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'

export { renderWithProviders }
