import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { CharacterCard, characterCardInfo } from "./characterCard";
import styles from './scss/characterCardList.module.scss'
import { NavigationBlock } from "../navigation";

interface ResultFromRequest {
	info: {
		next: string | null
		prev: string | null
	}
	results: characterCardInfo[]
}



export const CharactersCardList: React.FC = () => {
	const [info, setInfo] = useState<ResultFromRequest['info']>({prev: null, next: null});
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);



	const location = useLocation();
	let pageNumber: string | null = new URLSearchParams(location.search).get('page');
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
				const response = await fetch(`https://rickandmortyapi.com/api/character?page=${number}`);
				if (!response.ok) {
					throw new Error("Failed to fetch Data");
				}
				const result: ResultFromRequest = await response.json();
				setData(result.results);
				setInfo(result.info)

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
		<section className={styles.cardList}>
			{loading ? 
				<div>loading</div> :	
			data?.map((characterFull: characterCardInfo) => {
				const newCharacter: characterCardInfo = characterFull
				return <CharacterCard  url={null} character={newCharacter} key={newCharacter.id} />
			})
		}
		<NavigationBlock info={info}/>
		</section>
	)
}