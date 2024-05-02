import React from "react"
import styles from './media/scss/characters.module.scss'
import { CharactersCardList } from "./charactersCardList"

export const Characters: React.FC = () => {
	return (
		<section className={styles.charactersBlock}>
			<CharactersCardList/>
		</section>
	)
}