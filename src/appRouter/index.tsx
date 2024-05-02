import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Characters } from "../sections/characters";
import { Locations } from "../sections/locations";
import { Episodes } from "../sections/episodes";
import { CharacterPage } from "../sections/characters/characterPage";
import { LocationPage } from "../sections/locations/locationPage";
import { EpisodePage } from "../sections/episodes/episodePage";
import { Home } from "../sections/home";


export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path="/" Component={Home}></Route>
			<Route path="/characters" Component={Characters}></Route>
			<Route path="/locations" Component={Locations}></Route>
			<Route path="/episodes" Component={Episodes}></Route>
			<Route path="/character" Component={CharacterPage}></Route>
			<Route path="/location" Component={LocationPage}></Route>
			<Route path="/episode" Component={EpisodePage}></Route>
		</Routes>
	)
}