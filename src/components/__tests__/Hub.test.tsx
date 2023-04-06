import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Hub from '../Hub'

test('renders the App component', () => {
  render(
    <BrowserRouter>
      <Hub />
    </BrowserRouter>
  )
  const linkElement = screen.getByRole('heading')
  expect(linkElement).toHaveTextContent(/Podcaster/)
})
