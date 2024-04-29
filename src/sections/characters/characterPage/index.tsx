import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from './scss/characterPage.module.scss'

export const CharacterPage: React.FC = () => {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);



	const location = useLocation();
	let pageNumber: string | null = new URLSearchParams(location.search).get('id');
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
				setLoading(false);
			}
			catch (error:any) {
				setError(error.message as string);
				setLoading(false);
			}
		};

		fetchData()
	}, [number])
	console.log(data)
	return (
		loading ? 
			<div>Loading</div>
			:
			<section className={styles.fullPage}>
				<section className={styles.topInfo}>
					<span className={styles.photoCard}>
						<h2>{data.name}</h2>
						<img src={data.image} alt={data.name} />
					</span>
					<ul>
						<li>Species: {data.species} {data.type === '' ? '' : data.type}</li>
						<li>Status: {data.status}</li>
						<li>Gender: {data.gender}</li>
					</ul>
				</section>
			</section>
	)
}