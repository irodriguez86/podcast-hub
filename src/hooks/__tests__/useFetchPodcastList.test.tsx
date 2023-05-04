import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { fetchPodcastList } from '../../api'
import { useFetchPodcastList } from '../useFetchPodcastList'
import PodcastContext, {
  PodcastContextType,
} from '../../context/PodcastContext'

jest.mock('../../api')

const mockFetchPodcastList = fetchPodcastList as jest.MockedFunction<
  typeof fetchPodcastList
>

const mockPodcastList = [
  {
    id: 'podcast-1',
    name: 'Podcast 1',
    artist: 'Artist 1',
    image: 'image-1',
    description: 'Description 1',
    publishDate: '2022-05-01',
  },
  {
    id: 'podcast-2',
    name: 'Podcast 2',
    artist: 'Artist 2',
    image: 'image-2',
    description: 'Description 2',
    publishDate: '2022-05-02',
  },
]

const setIsLoading = jest.fn()
const setPodcastList = jest.fn()

const podcastContextValue: PodcastContextType = {
  podcastList: null,
  setPodcastList: setPodcastList,
  isLoading: false,
  setIsLoading: setIsLoading,
  length: 0,
  chapters: new Map([]),
  setChapters: jest.fn(),
}

const renderUserFetchPodcastList = () => {
  renderHook(() => useFetchPodcastList(), {
    wrapper: ({ children }) => (
      <PodcastContext.Provider value={podcastContextValue}>
        {children}
      </PodcastContext.Provider>
    ),
  })
}

describe('useFetchPodcastList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should set isLoading to true before fetching the data', () => {
    mockFetchPodcastList.mockResolvedValueOnce(mockPodcastList)

    renderUserFetchPodcastList()

    expect(setIsLoading).toHaveBeenCalledWith(true)
  })
  it('Should set isLoading to false after fetching the data', () => {
    mockFetchPodcastList.mockResolvedValueOnce(mockPodcastList)

    renderUserFetchPodcastList()

    waitFor(() => {
      expect(setIsLoading).toHaveBeenLastCalledWith(false)
    })
  })

  it('Should fetch the podcast list save the fetched data to local storage', () => {
    mockFetchPodcastList.mockResolvedValueOnce(mockPodcastList)

    renderUserFetchPodcastList()

    waitFor(() => {
      expect(fetchPodcastList).toHaveBeenCalled()
      expect(setPodcastList).toHaveBeenCalledWith(mockPodcastList)

      const dataFromLocalStorage = localStorage.getItem('podcastList')
      expect(dataFromLocalStorage).not.toBeNull()

      if (dataFromLocalStorage) {
        const parsedData = JSON.parse(dataFromLocalStorage)
        expect(parsedData.podcastInfo).toEqual(mockPodcastList)
      }
    })
  })

  it('should retrieve data from local storage if it is not empty', () => {
    localStorage.setItem(
      'podcastList',
      JSON.stringify({ podcastInfo: mockPodcastList, timestamp: Date.now() })
    )

    renderUserFetchPodcastList()

    // It should not fetch the data from the API
    expect(fetchPodcastList).not.toHaveBeenCalled()
    // But should set the podcast list obtained from the local storage in the context
    expect(setPodcastList).toHaveBeenCalledWith(mockPodcastList)
  })
})
