import { describe, expect, it } from 'vitest';
import { assetToTrack, createDefaultPlaylists, filterTracks, moveTrack, sortTracks, toggleTrackId, type LibraryTrack } from '../library-model';

const tracks: LibraryTrack[] = [
	{ id: '2', url: 'file:///b.mp3', title: 'Beta', artist: 'Zed', album: 'B', duration: 200, filename: 'beta.mp3', dateAdded: 2, playCount: 1 },
	{ id: '1', url: 'file:///a.mp3', title: 'Alpha', artist: 'Ann', album: 'A', duration: 100, filename: 'alpha.mp3', dateAdded: 1, playCount: 3 },
];
	describe('library model', () => {
	it('normalizes media assets into playable tracks', () => {
		const track = assetToTrack({
			id: 'asset-1',
			filename: 'Song Name.mp3',
			uri: 'file:///song.mp3',
			mediaType: 'audio',
			mediaSubtypes: [],
			width: 0,
			height: 0,
			creationTime: 100,
			modificationTime: 100,
			duration: 180,
		} as never);

		expect(track).toMatchObject({ id: 'asset-1', title: 'Song Name', artist: 'Unknown artist', duration: 180 });
	});

	it('creates an all-music playlist from track IDs', () => {
		expect(createDefaultPlaylists(tracks, 123)[0]).toMatchObject({ id: 'all-local-music', trackIds: ['2', '1'], createdAt: 123 });
	});

	it('filters by title, artist, album, and filename', () => {
		expect(filterTracks(tracks, 'ann')).toHaveLength(1);
		expect(filterTracks(tracks, 'beta.mp3')).toHaveLength(1);
	});

	it('sorts tracks by metadata fields', () => {
		expect(sortTracks(tracks, 'title').map((track) => track.id)).toEqual(['1', '2']);
		expect(sortTracks(tracks, 'playCount', false).map((track) => track.id)).toEqual(['1', '2']);
	});

	it('moves and toggles track IDs immutably', () => {
		expect(moveTrack(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a']);
		expect(toggleTrackId(['a'], 'b')).toEqual(['a', 'b']);
		expect(toggleTrackId(['a', 'b'], 'a')).toEqual(['b']);
	});
});
