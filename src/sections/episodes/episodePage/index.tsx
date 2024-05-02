import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CharacterCard } from "../../characters/charactersCardList/characterCard";
import styles from './scss/episodePage.module.scss'
import { EpisodeFullInfo } from "../episodesCardList/episodeCard";
import { ErrorsShow } from "../../../utils/errorShow";

export const EpisodePage: React.FC = () => {
	const [data, setData] = useState<EpisodeFullInfo | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const location = useLocation();
	const pageNumber: string | null = new URLSearchParams(location.search).get('id');
	let number: number = 0;	
	if (pageNumber !== null) {
	  const parsedNumber = parseInt(pageNumber);
	  if (!isNaN(parsedNumber)) {
	    number = parsedNumber;
	  }
	}

	useEffect(() => {

		const locationData = async () => {
			try {
				setLoading(true);
				const response = await fetch(`https://rickandmortyapi.com/api/episode/${number}`);
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const result: EpisodeFullInfo = await response.json();
				setData(result);
			}
			catch (error) {
				const errorMessage = (error as Error).message;
                setError(errorMessage || "An error occurred");
                setLoading(false);			}
			finally {
				setLoading(false);
			}
		}
		locationData()
	}, [number])


	return (
		loading || error !== null ? 
		error !== null ? 
		<ErrorsShow message={error}/> :
		<div>Loading</div> 
		: 
		<section className={styles.episodePage}>
			<h1 className={styles.episodeName}>{data?.name}</h1>
			<p className={styles.episodeData}>{data?.episode}</p>
			<p className={styles.episodeData}>{data?.air_date}</p>
			<h3 className={styles.resTitle}>Characters:</h3>
			<section className={styles.characters}>
			{data?.characters.map((character, index) => {
				return(
					<li className={styles.character} key={index}>
						<CharacterCard url={character} />
					</li>
				) 
			})}
			</section>
			<h3 className={styles.residentsCount}>{data?.characters.length}</h3>
			</section>
	)
}