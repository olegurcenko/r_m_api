import React, { useEffect, useState } from "react";
import { LocationData, LocationRender } from "./locationRequester";
import { useLocation } from "react-router-dom";
import { NavigationLocationBlock } from "./navigation/navigation";

interface ResultFromRequest {
    info: {
        next: string | null;
        prev: string | null;
    };
    results: LocationData[];
}

export const Locations: React.FC = () => {
    const [info, setInfo] = useState<ResultFromRequest['info']>({ prev: null, next: null });
    const [data, setData] = useState<LocationData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const pageNumber: string | null = new URLSearchParams(location.search).get('page') || '1';
    const number: number = parseInt(pageNumber);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://rickandmortyapi.com/api/location/?page=${number}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result: ResultFromRequest = await response.json();
                setData(result.results);
                setInfo(result.info);
            } catch (error:any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [number]);

    return (
        <div>
            {loading ? <p>Loading...</p> : (
                error ? <p>Error: {error}</p> : (
                    data?.map((location) => (
                        <LocationRender key={location.id} url={location.url} />
                    ))
                )
            )}
            <NavigationLocationBlock info={info} />
        </div>
    );
};
