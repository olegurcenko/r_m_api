import React from "react";
import styles from './scss/errorShow.module.scss'

interface Error {
	message: string
}

export const ErrorsShow: React.FC<Error> = ({message}) => {
	return <section className={styles.container}>
		<h1>Error</h1>
		{message}
	</section>
}