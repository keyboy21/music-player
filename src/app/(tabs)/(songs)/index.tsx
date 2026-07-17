import { Paragraph } from '@/components/Paragraph';
import TrackListItem from '@/components/TrackListItem';
import { useLibrary } from '@/store/library';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { Keyboard, ScrollView, View } from 'react-native';

const SongScreen = () => {
	const params = useLocalSearchParams<{ q?: string }>();
	const searchText = params?.q?.toLowerCase() || '';
	const { tracks, isFavorite, setCurrentTrackId, toggleTrackFavorite } = useLibrary();

	const filteredTracks = tracks.filter((track) => {
		if (!searchText) return true;
		return [track.title, track.artist, track.album]
			.filter(Boolean)
			.some((value) => value?.toLowerCase().includes(searchText));
	});

	return (
		<ScrollView>
			<FlashList
				className="mx-2"
				scrollToOverflowEnabled
				contentInsetAdjustmentBehavior="automatic"
				onScrollBeginDrag={Keyboard.dismiss}
				keyboardShouldPersistTaps="handled"
				contentContainerClassName="pt-4 pb-24"
				data={filteredTracks}
				renderItem={({ item }) => (
					<TrackListItem
						track={item}
						isFavorite={isFavorite(item)}
						onPress={() => setCurrentTrackId(item.id)}
						onFavoritePress={() => toggleTrackFavorite(item)}
					/>
				)}
				ItemSeparatorComponent={() => <View className="my-2 ml-20 border-[0.5px] border-gray-400 opacity-20" />}
				ListEmptyComponent={() => (
					<View>
						<Paragraph size="lg" fontStyle="italic" color="error" className="self-center">
							No results found
						</Paragraph>
					</View>
				)}
			/>
		</ScrollView>
	);
};

export default SongScreen;
