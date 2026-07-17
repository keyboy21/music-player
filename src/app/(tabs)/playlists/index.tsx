import { Paragraph } from '@/components/Paragraph';
import { colors } from '@/configs/style.config';
import { useLibrary } from '@/store/library';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { useState } from 'react';

const PlaylistsScreen = () => {
	const { playlists, getPlaylistTracks, setCurrentTrackId, createPlaylist, tracks } = useLibrary();
	const [playlistName, setPlaylistName] = useState('');

	const handleCreatePlaylist = () => {
		const name = playlistName.trim();
		if (!name) return;
		createPlaylist(name);
		setPlaylistName('');
	};

	return (
		<FlatList
			contentContainerClassName="gap-4 px-4 pt-4 pb-24"
			ListHeaderComponent={() => (
				<View className="gap-3 rounded-2xl bg-zinc-900 p-4">
					<Paragraph size="lg" weight="bold">Create playlist</Paragraph>
					<TextInput
						accessibilityLabel="Playlist name"
						placeholder="Road trip, workouts, favourites..."
						placeholderTextColor={colors.textMuted}
						value={playlistName}
						onChangeText={setPlaylistName}
						className="rounded-xl bg-black px-3 py-3 text-white"
					/>
					<Pressable className="items-center rounded-xl px-4 py-3" style={{ backgroundColor: colors.primary }} onPress={handleCreatePlaylist}>
						<Paragraph weight="bold">Create empty playlist</Paragraph>
					</Pressable>
					<Paragraph color="muted">{tracks.length} tracks available to add in upcoming multi-select flow.</Paragraph>
				</View>
			)}
			data={playlists}
			keyExtractor={(playlist) => playlist.id}
			renderItem={({ item }) => {
				const playlistTracks = getPlaylistTracks(item.id);
				return (
					<Pressable
						className="rounded-2xl p-4"
						style={{ backgroundColor: colors.primary }}
						onPress={() => {
							const firstTrack = playlistTracks[0];
							if (firstTrack) setCurrentTrackId(firstTrack.id);
						}}
					>
						<Paragraph size="xl" weight="bold">{item.name}</Paragraph>
						<Paragraph color="muted" className="mt-1">{item.description}</Paragraph>
						<Paragraph className="mt-3">{playlistTracks.length} tracks</Paragraph>
					</Pressable>
				);
			}}
			ListEmptyComponent={() => (
				<View className="px-4 py-8">
					<Paragraph size="lg" weight="semibold">No playlists yet</Paragraph>
					<Paragraph color="muted" className="mt-2">Create a playlist to start organizing local music.</Paragraph>
				</View>
			)}
		/>
	);
};

export default PlaylistsScreen;
