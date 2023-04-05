import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { PodcastInfo, useFetchPodcastList } from '../hooks/useFetchPodcastList';

type PodcastContextType = {
    podcastList: PodcastInfo[] | null;
    setPodcastList: React.Dispatch<React.SetStateAction<PodcastInfo[] | null>>;
    length: number;
};

type Props = {
    children: ReactNode;
};

export const PodcastContext = createContext<PodcastContextType>({
    podcastList: null,
    setPodcastList: () => {},
    length: 0,
});

export const PodcastProvider = ({ children }: Props): JSX.Element => {
    const [podcastList, setPodcastList] = useState<PodcastInfo[] | null>(null);

    return (
        <PodcastContext.Provider value={{ podcastList, setPodcastList, length: podcastList?.length ?? 0 }}>
            {children}
        </PodcastContext.Provider>
    );
};

export default PodcastContext;
