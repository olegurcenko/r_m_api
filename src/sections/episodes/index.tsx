import React from "react";
import { EpisodesCardList } from "./episodesCardList";
import styles from './scss/episodes.module.scss'

export const Episodes: React.FC = () => {
	return (
		<section className={styles.episodesBlock}>
			<EpisodesCardList/>
		</section>
	)
}