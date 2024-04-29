import React from "react"
import { Link } from "react-router-dom"
import styles from './scss/characterCard.module.scss'
import open from './media/open.png'

export interface characterCardInfo {
	id: number
	name: string
	status: 'Unknown' | 'Alive' | 'Dead'
	image: string
}

export const CharacterCard: React.FC<characterCardInfo> = (character) => {
	return (
		<section className={styles.characterCard}>
			<span className={styles.infoBlock}>
				{character.status && (
					<div>
      					{(() => {
							  switch (character.status) {
								  case 'Alive':
									  return <div className={styles.alive}>Alive</div>;
									  case 'Dead':
										  return <div className={styles.dead}>Dead</div>;
										  default:
											  return <div className={styles.unknown}>Unknown</div>;
											}
										})()}
    				</div>
				)}
				<Link className={styles.fullLink} to={`/character?id=${character.id}`}>
					<img src={open} alt="" />
				</Link>
			</span>
			<span className={styles.avatar}>
				<img className={styles.avatarImage} src={character.image} alt={character.name} />
				<p className={styles.textOnPhoto}>{character.name}</p>
			</span>
		</section>
	)
}