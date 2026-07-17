import { useCallback, useState } from 'react';
import type { Track } from 'react-native-track-player';

type FavoriteTrack = Track & { rating?: number };

export const useFavorites = () => {
	const [favorites, setFavorites] = useState<FavoriteTrack[]>([]);

	const toggleTrackFavorite = useCallback((track: FavoriteTrack) => {
		setFavorites((currentFavorites) => {
			const isFavorite = currentFavorites.some((favorite) => favorite.url === track.url);

			if (isFavorite) {
				return currentFavorites.filter((favorite) => favorite.url !== track.url);
			}

			return [...currentFavorites, { ...track, rating: 1 }];
		});
	}, []);

	return { favorites, toggleTrackFavorite };
};
