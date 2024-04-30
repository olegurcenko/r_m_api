import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './scss/characterPage.module.scss'
import { statSync } from "fs";

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
					<img src={data.image} alt={data.name} />
					<ul className={styles.infoList}>
						<li className={styles.mainInfo}>
							<p className={styles.name}>{data.name}</p>
							<Link className={styles.location} to={''}><img src="https://cdn-icons-png.flaticon.com/512/535/535239.png" alt="" />{data.location.name}</Link>
						</li>
						<li className={styles.species}>{data.species} {data.type === '' ? '' : data.type} {data.gender === 'Male' ? <img className={styles.gender} src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Male_symbol_-_black.png"/> : (data.gender === 'Female' ? <img className={styles.gender} src="https://static.vecteezy.com/system/resources/previews/024/044/538/original/women-sign-gender-free-png.png"/> : <></>)}</li>
						<li className={styles.status}>{data.status === 'Alive' ? <p className={styles.alive}>Alive</p> : (data.status === 'Dead' ? <p className={styles.dead}>Dead</p> : <p className={styles.unknown}>Unknown</p>)}</li>
						{/*<li>Gender: {data.gender}</li>*/}
					</ul>
				</section>
			</section>
	)
}