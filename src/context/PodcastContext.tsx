import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { Chapter, PodcastInfo } from '../hooks/useFetchPodcastList'

type PodcastContextType = {
  podcastList: PodcastInfo[] | null
  setPodcastList: React.Dispatch<React.SetStateAction<PodcastInfo[] | null>>
  length: number
  chapters: Map<string, Chapter[]>
  setChapters: React.Dispatch<React.SetStateAction<Map<string, Chapter[]>>>
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
})

export const PodcastProvider = ({ children }: Props): JSX.Element => {
  const [podcastList, setPodcastList] = useState<PodcastInfo[] | null>(null)
  const [chapters, setChapters] = useState<Map<string, Chapter[]>>(new Map())

  return (
    <PodcastContext.Provider
      value={{
        podcastList,
        setPodcastList,
        length: podcastList?.length ?? 0,
        chapters,
        setChapters,
      }}
    >
      {children}
    </PodcastContext.Provider>
  )
}

export default PodcastContext
