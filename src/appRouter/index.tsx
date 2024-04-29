import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Characters } from "../sections/characters";
import { Locations } from "../sections/locations";
import { Episodes } from "../sections/episodes";
import { CharacterPage } from "../sections/characters/characterPage";


export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path="/characters" Component={Characters}></Route>
			<Route path="/locations" Component={Locations}></Route>
			<Route path="/episodes" Component={Episodes}></Route>
			<Route path="/character" Component={CharacterPage}></Route>
		</Routes>
	)
}