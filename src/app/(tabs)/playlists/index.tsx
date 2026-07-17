import { Paragraph } from '@/components/Paragraph';
import { colors } from '@/configs/style.config';
import { useLibrary } from '@/store/library';
import { FlatList, Pressable, View } from 'react-native';

const PlaylistsScreen = () => {
	const { playlists, getPlaylistTracks, setCurrentTrackId } = useLibrary();

	return (
		<FlatList
			contentContainerClassName="gap-4 px-4 pt-4 pb-24"
			data={playlists}
			keyExtractor={(playlist) => playlist.id}
			renderItem={({ item }) => {
				const tracks = getPlaylistTracks(item.id);
				return (
					<Pressable
						className="rounded-2xl p-4"
						style={{ backgroundColor: colors.primary }}
						onPress={() => {
							const firstTrack = tracks[0];
							if (firstTrack) setCurrentTrackId(firstTrack.id);
						}}
					>
						<Paragraph size="xl" weight="bold">{item.name}</Paragraph>
						<Paragraph color="muted" className="mt-1">{item.description}</Paragraph>
						<Paragraph className="mt-3">{tracks.length} tracks</Paragraph>
					</Pressable>
				);
			}}
			ListEmptyComponent={() => (
				<View className="px-4 py-8">
					<Paragraph size="lg" weight="semibold">No playlists yet</Paragraph>
					<Paragraph color="muted" className="mt-2">Create playlist support is planned for the local music library milestone.</Paragraph>
				</View>
			)}
		/>
	);
};

export default PlaylistsScreen;
