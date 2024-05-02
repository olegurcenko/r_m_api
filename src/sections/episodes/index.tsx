import React from "react";
import { EpisodesCardList } from "./episodesCardList";
import styles from './scss/episodes.module.scss'
//"https://rickandmortyapi.com/api/episode?page=2"
export const Episodes: React.FC = () => {
	return (
		<section className={styles.episodesBlock}>
			<EpisodesCardList/>
		</section>
	)
}