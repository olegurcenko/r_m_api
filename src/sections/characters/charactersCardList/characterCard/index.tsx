import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './scss/characterCard.module.scss';
import open from './media/open.png';

export interface characterCardInfo {
    id: number;
    name: string;
    status: 'Unknown' | 'Alive' | 'Dead';
    image: string;
    species?: string;
    type?: string;
    gender?: string;
    origin?: {
        name: string;
        url: string;
    };
    location?: {
        name: string;
        url: string;
    };
    episode?: string[];
}

export interface PropsForCard {
    character?: characterCardInfo;
    url: string | null;
}

export const CharacterCard: React.FC<PropsForCard> = ({ character, url }) => {
    const [data, setData] = useState<characterCardInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (character) {
                setData(character);
                setLoading(false);
            } else if (url) {
                try {
                    setLoading(true);
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    const result: characterCardInfo = await response.json();
                    setData(result);
                } catch (error:any) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [character, url]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data) {
        return <p>No data available</p>;
    }

    return (
        <section className={styles.characterCard}>
            <span className={styles.infoBlock}>
                {data.status && (
                    <div>
                        {(() => {
                            switch (data.status) {
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
                <Link className={styles.fullLink} to={`/character?id=${data.id}`}>
                    <img src={open} alt="" />
                </Link>
            </span>
            <span className={styles.avatar}>
                <img className={styles.avatarImage} src={data.image} alt={data.name} />
                <p className={styles.textOnPhoto}>{data.name}</p>
            </span>
        </section>
    );
};
