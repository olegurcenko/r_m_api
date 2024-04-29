import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
		<section>
			{number > 1 ? 
				<Link to={`/characters?page=${number - 1}`}>{'<'}</Link>
			: 
				<span>{'<'}</span>	
			}
			<p>{`${pageNumber}`}</p>
			<Link to={`/characters?page=${number + 1}`}>{'>'}</Link>
		</section>
	)
}