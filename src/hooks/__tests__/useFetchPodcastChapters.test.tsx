import React from 'react'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useFetchPodcastChapters } from '../useFetchPodcastChapters'
import PodcastContext, {
  PodcastContextType,
} from '../../context/PodcastContext'
import { fetchPodcastChapters } from '../../api'
import { saveDataToLocalStorage } from '../../storage'

jest.mock('../../api', () => ({
  fetchPodcastChapters: jest.fn(),
}))

const id = 'podcast-id'
const chapters = [
  {
    id: id,
    title: 'Chapter 1',
    publishDate: '2022-01-01',
    duration: 3600,
    description: 'Chapter 1 description',
    episode: 'Episode 1',
  },
]

const localChapters = new Map()
localChapters.set(id, chapters)

const setChapters = jest.fn()
const setIsLoading = jest.fn()

const podcastContextValue: PodcastContextType = {
  podcastList: null,
  setPodcastList: jest.fn(),
  isLoading: false,
  setIsLoading: setIsLoading,
  length: 0,
  chapters: localChapters,
  setChapters: setChapters,
}

describe('useFetchPodcastChapters', () => {
  it('should set the chapters from local storage if available', () => {
    saveDataToLocalStorage(localChapters)

    const { result } = renderHook(() => useFetchPodcastChapters(id), {
      wrapper: ({ children }) => (
        <PodcastContext.Provider value={podcastContextValue}>
          {children}
        </PodcastContext.Provider>
      ),
    })

    waitFor(() => {
      expect(fetchPodcastChapters).not.toHaveBeenCalled()
      expect(setChapters).toHaveBeenCalledWith(localChapters)
      expect(result.current).toEqual(chapters)
    })
  })

  it('should fetch the chapters from the API and set them on the context and local storage', async () => {
    ;(fetchPodcastChapters as jest.Mock).mockResolvedValue(chapters)

    const saveDataToLocalStorageMock = jest.fn()
    jest.mock('../../storage', () => ({
      saveDataToLocalStorage: saveDataToLocalStorageMock,
    }))

    const localStorageSetItemMock = jest.fn()
    localStorage.setItem = localStorageSetItemMock

    let result: any = undefined
    await act(async () => {
      result = renderHook(() => useFetchPodcastChapters(id), {
        wrapper: ({ children }) => (
          <PodcastContext.Provider value={podcastContextValue}>
            {children}
          </PodcastContext.Provider>
        ),
      }).result
    })

    waitFor(() => {
      expect(setIsLoading).toHaveBeenCalledWith(true)
      expect(fetchPodcastChapters).toHaveBeenCalledWith(id)
      expect(setIsLoading).toHaveBeenCalledWith(false)
      expect(setChapters).toHaveBeenCalledWith(localChapters)
      expect(result.current).toEqual(chapters)
      expect(saveDataToLocalStorageMock).toHaveBeenCalledWith(localChapters)
    })
  })
})
