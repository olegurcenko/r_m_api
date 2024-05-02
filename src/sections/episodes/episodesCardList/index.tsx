import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from './scss/episodesCardList.module.scss'
import { EpisodeCard, EpisodeFullInfo } from "./episodeCard";
import { NavigationBlock } from "./navigation";
import { ErrorsShow } from "../../../utils/errorShow";

interface ResultFromRequestEpisodes {
	info: {
        next: string | null;
        prev: string | null;
    }
	results: EpisodeFullInfo[]
}



export const EpisodesCardList: React.FC = () => {
	const [info, setInfo] = useState<ResultFromRequestEpisodes['info']>({ prev: null, next: null });
    const [data, setData] = useState<EpisodeFullInfo[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const pageNumber: string | null = new URLSearchParams(location.search).get('page') || '1';
    const number: number = parseInt(pageNumber);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://rickandmortyapi.com/api/episode/?page=${number}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result: ResultFromRequestEpisodes = await response.json();
                setData(result.results);
                setInfo(result.info);
            } catch (error) {
                const errorMessage = (error as Error).message;
                setError(errorMessage || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [number]);
	return (
        loading || error !== null ? 
		error !== null ? 
		<ErrorsShow message={error}/> :
		<div>Loading</div> 
		:
		<section className={styles.cardList}>
			{loading ? 
				<div>loading</div> :	
			data?.map((episodeFull: EpisodeFullInfo) => {
				const newEpisode: EpisodeFullInfo = episodeFull
				return <EpisodeCard  url={null} episode={newEpisode} key={newEpisode.id} />
			})
		}
		<NavigationBlock info={info}/>
		</section>
	)
}