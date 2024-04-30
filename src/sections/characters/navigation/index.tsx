import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './navigation.module.scss'

export const NavigationBlock: React.FC = () => {
	const location = useLocation();
	let pageNumber: string | null = new URLSearchParams(location.search).get('page');
	let number: number = 0;	
	if (pageNumber !== null) {
	  const parsedNumber = parseInt(pageNumber);
	  if (!isNaN(parsedNumber)) {
	    number = parsedNumber;
	  }
	}
	return (
		<section className={styles.navigationBlock}>
			{number > 1 ? 
				<Link className={styles.navigateButton} to={`/characters?page=${number - 1}`}>{'<'}</Link>
			: 
				<span className={styles.navigateButtonOff}>{'<'}</span>	
			}
			<p>{`${pageNumber}`}</p>
			<Link className={styles.navigateButton} to={`/characters?page=${number + 1}`}>{'>'}</Link>
		</section>
	)
}