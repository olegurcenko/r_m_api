import React, { useEffect, useState } from "react";
import styles from './scss/locationRebder.module.scss';
import { Link } from "react-router-dom";
import { ErrorsShow } from "../../../utils/errorShow";

interface LocationPorps {
	url: string
}

export interface LocationData {
	id: number
	name: string
	type: string
	dimension: string
	residents: Array<string>
	url: string
}

export const LocationRender: React.FC<LocationPorps> = ({url}) => {
	const [data, setData] = useState<LocationData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {

		const locationData = async () => {
			try {
				setLoading(true);
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const result: LocationData = await response.json();
				setData(result);
			}
			catch (error:any) {
				setError(error.message as string);
			}
			finally {
				setLoading(false);
			}
		}
		locationData()
	}, [url])
	
	console.log(data)
	return (
		loading || error !== null ? 
		error !== null ? 
		<ErrorsShow message={error}/> :
		<div>Loading</div> 
		:
			<Link to={`/location?id=${data?.id}`} className={styles.cardLocation}>
				{data?.name}
			</Link>
	)
}