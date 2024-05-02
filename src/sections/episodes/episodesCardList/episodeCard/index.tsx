import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './scss/episodeCard.module.scss';

export interface PropsForCard {
    episode?: EpisodeFullInfo;
    url: string | null;
}

export interface EpisodeFullInfo {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
}

export const EpisodeCard: React.FC<PropsForCard> = ({ episode, url }) => {
    const [data, setData] = useState<EpisodeFullInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (episode) {
                setData(episode);
                setLoading(false);
            } else if (url) {
                try {
                    setLoading(true);
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    const result: EpisodeFullInfo = await response.json();
                    setData(result);
                } catch (error) {
                    const errorMessage = (error as Error).message;
                    setError(errorMessage || "An error occurred");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [episode, url]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data) {
        return <p>No data available</p>;
    }

    return (
        <Link to={`/episode/?id=${data.id}`} className={styles.episodeCard}>
			<p className={styles.info}>{data.episode}</p>
			<p className={styles.name}>{data.name}</p>
            <p className={styles.info}>{data.air_date}</p>
        </Link>
    );
};
