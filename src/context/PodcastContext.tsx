import React, { ReactNode, createContext, useState } from 'react'
import { Chapter, PodcastInfo } from '../hooks/useFetchPodcastList'

export type PodcastContextType = {
  podcastList: PodcastInfo[] | null
  setPodcastList: React.Dispatch<React.SetStateAction<PodcastInfo[] | null>>
  length: number
  chapters: Map<string, Chapter[]>
  setChapters: React.Dispatch<React.SetStateAction<Map<string, Chapter[]>>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = {
  children: ReactNode
}

export const PodcastContext = createContext<PodcastContextType>({
  podcastList: null,
  setPodcastList: () => {},
  length: 0,
  chapters: new Map(),
  setChapters: () => {},
  isLoading: false,
  setIsLoading: () => {},
})

export const PodcastProvider = ({ children }: Props): JSX.Element => {
  const [podcastList, setPodcastList] = useState<PodcastInfo[] | null>(null)
  const [chapters, setChapters] = useState<Map<string, Chapter[]>>(new Map())
  const [isLoading, setIsLoading] = useState(false)

  return (
    <PodcastContext.Provider
      value={{
        podcastList,
        setPodcastList,
        length: podcastList?.length ?? 0,
        chapters,
        setChapters,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PodcastContext.Provider>
  )
}

export default PodcastContext
