import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library/legacy';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import TrackPlayer, { type Track } from 'react-native-track-player';

const STORAGE_KEYS = {
	favorites: 'music-player:favorites',
	playlists: 'music-player:playlists',
	settings: 'music-player:settings',
	lastTrackId: 'music-player:lastTrackId',
};

export type LibraryTrack = Track & {
	id: string;
	artist: string;
	album?: string;
	duration?: number;
	filename?: string;
	dateAdded?: number;
};

export type Playlist = {
	id: string;
	name: string;
	description: string;
	trackIds: string[];
	createdAt: number;
	updatedAt: number;
};

export type PlayerSettings = {
	autoScanOnLaunch: boolean;
	showFilenames: boolean;
};

const defaultSettings: PlayerSettings = {
	autoScanOnLaunch: true,
	showFilenames: true,
};

const fallbackTracks: LibraryTrack[] = [
	{
		id: 'demo-midnight-drive',
		url: 'https://example.com/audio/midnight-drive.mp3',
		title: 'Midnight Drive',
		artist: 'Neon Harbor',
		album: 'City Lights',
		duration: 214,
	},
	{
		id: 'demo-morning-coffee',
		url: 'https://example.com/audio/morning-coffee.mp3',
		title: 'Morning Coffee',
		artist: 'The Lo-Fi Room',
		album: 'Slow Starts',
		duration: 187,
	},
];

const createDefaultPlaylists = (tracks: LibraryTrack[]): Playlist[] => [
	{
		id: 'all-local-music',
		name: 'All Music',
		description: 'Every track currently indexed on this phone.',
		trackIds: tracks.map((track) => track.id),
		createdAt: Date.now(),
		updatedAt: Date.now(),
	},
];

const readJson = async <T,>(key: string, fallback: T): Promise<T> => {
	const value = await AsyncStorage.getItem(key);
	return value ? JSON.parse(value) as T : fallback;
};

const assetToTrack = (asset: MediaLibrary.Asset): LibraryTrack => {
	const title = asset.filename.replace(/\.[^/.]+$/, '') || 'Unknown title';
	return {
		id: asset.id,
		url: asset.uri,
		title,
		artist: 'Unknown artist',
		album: 'Local music',
		duration: asset.duration,
		filename: asset.filename,
		dateAdded: asset.creationTime,
	};
};

const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
	const [tracks, setTracks] = useState<LibraryTrack[]>(fallbackTracks);
	const [favorites, setFavorites] = useState<string[]>([]);
	const [playlists, setPlaylists] = useState<Playlist[]>(() => createDefaultPlaylists(fallbackTracks));
	const [settings, setSettingsState] = useState<PlayerSettings>(defaultSettings);
	const [currentTrackId, setCurrentTrackIdState] = useState(fallbackTracks[0]?.id);
	const [permissionStatus, setPermissionStatus] = useState<MediaLibrary.PermissionStatus | 'unknown'>('unknown');
	const [isScanning, setIsScanning] = useState(false);
	const [scanError, setScanError] = useState<string>();

	const currentTrack = useMemo(
		() => tracks.find((track) => track.id === currentTrackId) ?? tracks[0],
		[currentTrackId, tracks],
	);

	const persistQueue = useCallback(async (queueTracks: LibraryTrack[], selectedTrackId?: string) => {
		try {
			await TrackPlayer.reset();
			await TrackPlayer.add(queueTracks);
			const selectedIndex = queueTracks.findIndex((track) => track.id === selectedTrackId);
			if (selectedIndex >= 0) await TrackPlayer.skip(selectedIndex);
		} catch (error) {
			console.warn('Unable to update Track Player queue', error);
		}
	}, []);

	const scanLocalMusic = useCallback(async () => {
		setIsScanning(true);
		setScanError(undefined);

		try {
			let permissions = await MediaLibrary.getPermissionsAsync();
			if (!permissions.granted) {
				permissions = await MediaLibrary.requestPermissionsAsync();
			}

			setPermissionStatus(permissions.status);
			if (!permissions.granted) {
				setScanError('Media library permission is required to scan phone music.');
				return;
			}

			const assets = await MediaLibrary.getAssetsAsync({
				first: 1000,
				mediaType: MediaLibrary.MediaType.audio,
				sortBy: [MediaLibrary.SortBy.creationTime],
			});
			const localTracks = assets.assets.map(assetToTrack);
			const nextTracks = localTracks.length ? localTracks : fallbackTracks;
			setTracks(nextTracks);

			setPlaylists((currentPlaylists) => {
				const allMusic = createDefaultPlaylists(nextTracks)[0];
				const customPlaylists = currentPlaylists.filter((playlist) => playlist.id !== allMusic.id);
				const nextPlaylists = [allMusic, ...customPlaylists];
				AsyncStorage.setItem(STORAGE_KEYS.playlists, JSON.stringify(nextPlaylists));
				return nextPlaylists;
			});
			await persistQueue(nextTracks, currentTrackId);
		} catch (error) {
			setScanError(error instanceof Error ? error.message : 'Unable to scan local music.');
		} finally {
			setIsScanning(false);
		}
	}, [currentTrackId, persistQueue]);

	useEffect(() => {
		const loadPersistedState = async () => {
			const [storedFavorites, storedPlaylists, storedSettings, storedLastTrackId] = await Promise.all([
				readJson<string[]>(STORAGE_KEYS.favorites, []),
				readJson<Playlist[]>(STORAGE_KEYS.playlists, createDefaultPlaylists(fallbackTracks)),
				readJson<PlayerSettings>(STORAGE_KEYS.settings, defaultSettings),
				AsyncStorage.getItem(STORAGE_KEYS.lastTrackId),
			]);
			setFavorites(storedFavorites);
			setPlaylists(storedPlaylists);
			setSettingsState({ ...defaultSettings, ...storedSettings });
			if (storedLastTrackId) setCurrentTrackIdState(storedLastTrackId);
			if (storedSettings.autoScanOnLaunch ?? defaultSettings.autoScanOnLaunch) {
				void scanLocalMusic();
			} else {
				void persistQueue(fallbackTracks, storedLastTrackId ?? fallbackTracks[0]?.id);
			}
		};

		void loadPersistedState();
	}, [persistQueue, scanLocalMusic]);

	const setCurrentTrackId = useCallback((trackId: string) => {
		setCurrentTrackIdState(trackId);
		void AsyncStorage.setItem(STORAGE_KEYS.lastTrackId, trackId);
		void persistQueue(tracks, trackId);
	}, [persistQueue, tracks]);

	const toggleTrackFavorite = useCallback((track: Track) => {
		if (!track.id) return;
		setFavorites((currentFavorites) => {
			const nextFavorites = currentFavorites.includes(track.id as string)
				? currentFavorites.filter((trackId) => trackId !== track.id)
				: [...currentFavorites, track.id as string];
			void AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(nextFavorites));
			return nextFavorites;
		});
	}, []);

	const isFavorite = useCallback(
		(track: Track) => Boolean(track.id && favorites.includes(track.id)),
		[favorites],
	);

	const favoriteTracks = useMemo(
		() => tracks.filter((track) => favorites.includes(track.id)),
		[favorites, tracks],
	);

	const getPlaylistTracks = useCallback(
		(playlistId: string) => {
			const playlist = playlists.find((item) => item.id === playlistId);
			return playlist?.trackIds
				.map((trackId) => tracks.find((track) => track.id === trackId))
				.filter((track): track is LibraryTrack => Boolean(track)) ?? [];
		},
		[playlists, tracks],
	);

	const createPlaylist = useCallback((name: string, trackIds: string[] = []) => {
		const now = Date.now();
		const playlist: Playlist = {
			id: `playlist-${now}`,
			name,
			description: `${trackIds.length} saved tracks`,
			trackIds,
			createdAt: now,
			updatedAt: now,
		};
		setPlaylists((currentPlaylists) => {
			const nextPlaylists = [...currentPlaylists, playlist];
			void AsyncStorage.setItem(STORAGE_KEYS.playlists, JSON.stringify(nextPlaylists));
			return nextPlaylists;
		});
	}, []);

	const setSettings = useCallback((nextSettings: Partial<PlayerSettings>) => {
		setSettingsState((currentSettings) => {
			const updatedSettings = { ...currentSettings, ...nextSettings };
			void AsyncStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(updatedSettings));
			return updatedSettings;
		});
	}, []);

	const value = useMemo(
		() => ({
			tracks,
			playlists,
			favorites: favoriteTracks,
			settings,
			currentTrack,
			permissionStatus,
			isScanning,
			scanError,
			setCurrentTrackId,
			toggleTrackFavorite,
			isFavorite,
			getPlaylistTracks,
			createPlaylist,
			setSettings,
			scanLocalMusic,
		}),
		[
			tracks,
			playlists,
			favoriteTracks,
			settings,
			currentTrack,
			permissionStatus,
			isScanning,
			scanError,
			setCurrentTrackId,
			toggleTrackFavorite,
			isFavorite,
			getPlaylistTracks,
			createPlaylist,
			setSettings,
			scanLocalMusic,
		],
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

type LibraryContextValue = {
	tracks: LibraryTrack[];
	playlists: Playlist[];
	favorites: LibraryTrack[];
	settings: PlayerSettings;
	currentTrack?: LibraryTrack;
	permissionStatus: MediaLibrary.PermissionStatus | 'unknown';
	isScanning: boolean;
	scanError?: string;
	setCurrentTrackId: (trackId: string) => void;
	toggleTrackFavorite: (track: Track) => void;
	isFavorite: (track: Track) => boolean;
	getPlaylistTracks: (playlistId: string) => LibraryTrack[];
	createPlaylist: (name: string, trackIds?: string[]) => void;
	setSettings: (settings: Partial<PlayerSettings>) => void;
	scanLocalMusic: () => Promise<void>;
};
