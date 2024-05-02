import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './scss/characterPage.module.scss'
import { characterCardInfo } from "../charactersCardList/characterCard";
import { EpisodeCard } from "../../episodes/episodesCardList/episodeCard";
import { ErrorsShow } from "../../../utils/errorShow";
import React from "react";

export const CharacterPage: React.FC = () => {
	const [data, setData] = useState<characterCardInfo | null>(null);
	const [locationId, setLocationId] = useState<string>('')
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

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
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(`https://rickandmortyapi.com/api/character/${number}`);
				if (!response.ok) {
					throw new Error("Failed to fetch Data");
				}
				const result = await response.json();
				setData(result);
				if (result?.location?.url) {
					const match = result.location.url.match(/\/(\d+)$/);
					if (match) {
						setLocationId(match[0].slice(1));
					}
				}
				setLoading(false);
			}
			catch (error) {
				const errorMessage = (error as Error).message;
				setError(errorMessage || "An error occurred");
				setLoading(false);
			}
		};

		fetchData()
	}, [number])

	return (
		loading || error !== null ? 
		error !== null ? 
		<ErrorsShow message={error}/> :
		<div>Loading</div> 
		:
			<section className={styles.fullPage}>
				<section className={styles.topInfo}>
					<img src={data?.image} alt={data?.name} />
					<ul className={styles.infoList}>
						<li className={styles.mainInfo}>
							<p className={styles.name}>{data?.name}</p>
							<Link className={styles.location} to={`/location/?id=${locationId}`}><img src="https://cdn-icons-png.flaticon.com/512/535/535239.png" alt="" />{data?.location?.name}</Link>
						</li>
						<li className={styles.species}>{data?.species} {data?.type === '' ? '' : data?.type} {data?.gender === 'Male' ? <img className={styles.gender} src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Male_symbol_-_black.png" alt={data.gender}/> : (data?.gender === 'Female' ? <img className={styles.gender} src="https://static.vecteezy.com/system/resources/previews/024/044/538/original/women-sign-gender-free-png.png" alt={data.gender}/> : <></>)}</li>
						<li className={styles.status}>{data?.status === 'Alive' ? <p className={styles.alive}>Alive</p> : (data?.status === 'Dead' ? <p className={styles.dead}>Dead</p> : <p className={styles.unknown}>Unknown</p>)}</li>
						<li className={styles.origin}>{data?.origin?.name === 'unknown' ? <></> : `Origin: ${data?.origin?.name}`}</li>
					</ul>
				</section>
				<h2 className={styles.episodesTitle}>Episodes:</h2>
				<section className={styles.episodes}>
					{data?.episode?.map((episode, index) => {
						return (
							<li className={styles.episode} key={index}>
								<EpisodeCard url={episode}/>
							</li>
					)
					})}
				</section>
				<h3 className={styles.episodesCount}>{data?.episode?.length}</h3>
			</section>
	)
}