import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './navigation.module.scss'

interface infoProps {
	info: {
        next: string | null;
        prev: string | null;
    };
}

export const NavigationLocationBlock: React.FC<infoProps> = ({info}) => {
	const location = useLocation();
	const pageNumber: string | null = new URLSearchParams(location.search).get('page');
	let number: number = 0;
	if (pageNumber !== null) {
	  const parsedNumber = parseInt(pageNumber);
	  if (!isNaN(parsedNumber)) {
	    number = parsedNumber;
	  }
	}
	return (
		<section className={styles.navigationBlock}>
			{info.prev !== null ? 
				<Link className={styles.navigateButton} to={`/locations?page=${number - 1}`}>{'<'}</Link>
			: 
				<span className={styles.navigateButtonOff}>{'<'}</span>	
			}
			<p>{`${pageNumber}`}</p>
			{info.next !== null ? 
				<Link className={styles.navigateButton} to={`/locations?page=${number + 1}`}>{'>'}</Link>
			: 
				<span className={styles.navigateButtonOff}>{'>'}</span>	
			}
		</section>
	)
}