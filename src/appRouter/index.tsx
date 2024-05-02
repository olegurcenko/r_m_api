import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Characters } from "../sections/characters";
import { Locations } from "../sections/locations";
import { Episodes } from "../sections/episodes";
import { CharacterPage } from "../sections/characters/characterPage";
import { LocationRender } from "../sections/locations/locationRequester";
import { url } from "inspector";
import { LocationPage } from "../sections/locations/locationPage";


export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path="/characters" Component={Characters}></Route>
			<Route path="/locations" element={<Locations/>}></Route>
			<Route path="/episodes" Component={Episodes}></Route>
			<Route path="/character" Component={CharacterPage}></Route>
			<Route path="/location" Component={LocationPage}></Route>
		</Routes>
	)
}