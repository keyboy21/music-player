import type { Asset } from 'expo-media-library/legacy';
import type { Track } from 'react-native-track-player';

export type LibraryTrack = Track & {
	id: string;
	artist: string;
	album?: string;
	duration?: number;
	filename?: string;
	dateAdded?: number;
	playCount?: number;
	lastPlayedAt?: number;
};

export type Playlist = {
	id: string;
	name: string;
	description: string;
	trackIds: string[];
	createdAt: number;
	updatedAt: number;
};

export type SortKey = 'title' | 'artist' | 'album' | 'duration' | 'dateAdded' | 'playCount';

export const assetToTrack = (asset: Asset): LibraryTrack => {
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
		playCount: 0,
	};
};

export const createDefaultPlaylists = (tracks: LibraryTrack[], now = Date.now()): Playlist[] => [
	{
		id: 'all-local-music',
		name: 'All Music',
		description: 'Every track currently indexed on this phone.',
		trackIds: tracks.map((track) => track.id),
		createdAt: now,
		updatedAt: now,
	},
];

export const filterTracks = (tracks: LibraryTrack[], query: string) => {
	const searchText = query.trim().toLowerCase();
	if (!searchText) return tracks;

	return tracks.filter((track) =>
		[track.title, track.artist, track.album, track.filename]
			.filter(Boolean)
			.some((value) => value?.toLowerCase().includes(searchText)),
	);
};

export const sortTracks = (tracks: LibraryTrack[], sortKey: SortKey, ascending = true) => {
	const direction = ascending ? 1 : -1;
	return [...tracks].sort((firstTrack, secondTrack) => {
		const firstValue = firstTrack[sortKey] ?? '';
		const secondValue = secondTrack[sortKey] ?? '';

		if (typeof firstValue === 'number' && typeof secondValue === 'number') {
			return (firstValue - secondValue) * direction;
		}

		return String(firstValue).localeCompare(String(secondValue)) * direction;
	});
};

export const moveTrack = (trackIds: string[], fromIndex: number, toIndex: number) => {
	if (fromIndex < 0 || fromIndex >= trackIds.length || toIndex < 0 || toIndex >= trackIds.length) {
		return trackIds;
	}

	const nextTrackIds = [...trackIds];
	const [trackId] = nextTrackIds.splice(fromIndex, 1);
	nextTrackIds.splice(toIndex, 0, trackId);
	return nextTrackIds;
};

export const toggleTrackId = (trackIds: string[], trackId: string) => (
	trackIds.includes(trackId)
		? trackIds.filter((currentTrackId) => currentTrackId !== trackId)
		: [...trackIds, trackId]
);
