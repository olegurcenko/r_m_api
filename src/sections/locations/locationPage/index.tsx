import React, { useEffect, useState } from "react";
import { LocationData } from "../locationRequester";
import { useLocation } from "react-router-dom";
import { CharacterCard } from "../../characters/charactersCardList/characterCard";
import styles from './scss/locationPage.module.scss'
import { ErrorsShow } from "../../../utils/errorShow";

export const LocationPage: React.FC = () => {
	const [data, setData] = useState<LocationData | null>(null);
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
				const response = await fetch(`https://rickandmortyapi.com/api/location/${number}`);
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const result: LocationData = await response.json();
				setData(result);
			}
			catch (error) {
				const errorMessage = (error as Error).message;
                setError(errorMessage || "An error occurred");
			}
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
		<section className={styles.locationPage}>
			<h1 className={styles.planetName}>{data?.name}</h1>
			<p className={styles.planetData}>{data?.type}</p>
			<p className={styles.planetData}>{data?.dimension}</p>
			<h3 className={styles.resTitle}>Residents</h3>
			<section className={styles.residents}>
			{data?.residents.map((resident, index) => {
				return(
					<li className={styles.resident} key={index}>
						<CharacterCard url={resident} />
					</li>
				) 
			})}
			</section>
			<h3 className={styles.residentsCount}>{data?.residents.length}</h3>
		</section>
	)
}