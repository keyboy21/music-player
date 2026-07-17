import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import type { Track } from 'react-native-track-player';



export type LibraryTrack = Track & {
	id: string;
	artist: string;
	album?: string;
	duration?: number;
};

export type Playlist = {
	id: string;
	name: string;
	description: string;
	trackIds: string[];
};

const tracks: LibraryTrack[] = [
	{
		id: 'midnight-drive',
		url: 'https://example.com/audio/midnight-drive.mp3',
		title: 'Midnight Drive',
		artist: 'Neon Harbor',
		album: 'City Lights',
		duration: 214,
	},
	{
		id: 'morning-coffee',
		url: 'https://example.com/audio/morning-coffee.mp3',
		title: 'Morning Coffee',
		artist: 'The Lo-Fi Room',
		album: 'Slow Starts',
		duration: 187,
	},
	{
		id: 'blue-hour',
		url: 'https://example.com/audio/blue-hour.mp3',
		title: 'Blue Hour',
		artist: 'Avery Stone',
		album: 'Afterglow',
		duration: 241,
	},
	{
		id: 'sunset-loop',
		url: 'https://example.com/audio/sunset-loop.mp3',
		title: 'Sunset Loop',
		artist: 'Golden State',
		album: 'Coastline',
		duration: 199,
	},
	{
		id: 'rain-check',
		url: 'https://example.com/audio/rain-check.mp3',
		title: 'Rain Check',
		artist: 'Cloud District',
		album: 'Weather Patterns',
		duration: 226,
	},
];

const playlists: Playlist[] = [
	{
		id: 'daily-mix',
		name: 'Daily Mix',
		description: 'A balanced queue for focused listening.',
		trackIds: ['midnight-drive', 'morning-coffee', 'blue-hour'],
	},
	{
		id: 'evening',
		name: 'Evening Chill',
		description: 'Relaxed tracks for winding down.',
		trackIds: ['sunset-loop', 'rain-check', 'blue-hour'],
	},
];

const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
	const [favorites, setFavorites] = useState<FavoriteTrack[]>([]);
	const [currentTrackId, setCurrentTrackId] = useState(tracks[0]?.id);

	const currentTrack = useMemo(
		() => tracks.find((track) => track.id === currentTrackId) ?? tracks[0],
		[currentTrackId],
	);

	const toggleTrackFavorite = useCallback((track: FavoriteTrack) => {
		setFavorites((currentFavorites) => {
			const isFavorite = currentFavorites.some((favorite) => favorite.url === track.url);

			if (isFavorite) {
				return currentFavorites.filter((favorite) => favorite.url !== track.url);
			}

			return [...currentFavorites, { ...track, rating: 1 }];
		});
	}, []);

	const isFavorite = useCallback(
		(track: Track) => favorites.some((favorite) => favorite.url === track.url),
		[favorites],
	);

	const getPlaylistTracks = useCallback(
		(playlistId: string) => {
			const playlist = playlists.find((item) => item.id === playlistId);
			return playlist?.trackIds
				.map((trackId) => tracks.find((track) => track.id === trackId))
				.filter((track): track is LibraryTrack => Boolean(track)) ?? [];
		},
		[],
	);

	const value = useMemo(
		() => ({
			tracks,
			playlists,
			favorites,
			currentTrack,
			setCurrentTrackId,
			toggleTrackFavorite,
			isFavorite,
			getPlaylistTracks,
		}),
		[currentTrack, favorites, getPlaylistTracks, isFavorite, toggleTrackFavorite],
	);

	return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = () => {
	const context = useContext(LibraryContext);

	if (!context) {
		throw new Error('useLibrary must be used within LibraryProvider');
	}

	return context;
};

export const useFavorites = () => {
	const { favorites, toggleTrackFavorite } = useLibrary();
	return { favorites, toggleTrackFavorite };
};

type FavoriteTrack = Track & { id?: string; artist?: string; album?: string; duration?: number; rating?: number };

type LibraryContextValue = {
	tracks: LibraryTrack[];
	playlists: Playlist[];
	favorites: FavoriteTrack[];
	currentTrack?: LibraryTrack;
	setCurrentTrackId: (trackId: string) => void;
	toggleTrackFavorite: (track: Track) => void;
	isFavorite: (track: Track) => boolean;
	getPlaylistTracks: (playlistId: string) => LibraryTrack[];
};
