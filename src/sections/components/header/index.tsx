import React, { useEffect, useState } from "react";
import styles from './media/scss/header.module.scss'
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();

  const [activeClasses, setActiveClasses] = useState({
    characters: '',
    locations: '',
    episodes: ''
  });

  useEffect(() => {
    const { pathname } = location;

    setActiveClasses({
      characters: pathname === '/characters' ? styles.active : '',
      locations: pathname === '/locations' ? styles.active : '',
      episodes: pathname === '/episodes' ? styles.active : ''
    });
  }, [location]);

  return (
	<section className={styles.header}>
    	<section className={styles.headerWrapper}>
    	  <Link className={activeClasses.characters} to='/characters?page=1'>Characters</Link>
    	  <Link className={activeClasses.locations} to='/locations?page=1'>Locations</Link>
    	  <Link className={activeClasses.episodes} to='/episodes'>Episodes</Link>
    	</section>
	</section>
  );
};
