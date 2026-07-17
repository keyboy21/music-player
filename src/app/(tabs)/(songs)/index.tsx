import { Paragraph } from '@/components/Paragraph';
import TrackListItem from '@/components/TrackListItem';
import { colors } from '@/configs/style.config';
import { sortTracks, filterTracks, type SortKey } from '@/store/library-model';
import { useLibrary } from '@/store/library';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { Keyboard, Pressable, ScrollView, View } from 'react-native';
import { useState } from 'react';

const sortOptions: SortKey[] = ['title', 'artist', 'album', 'duration', 'dateAdded', 'playCount'];

const SongScreen = () => {
	const params = useLocalSearchParams<{ q?: string }>();
	const [sortKey, setSortKey] = useState<SortKey>('title');
	const { tracks, isFavorite, setCurrentTrackId, toggleTrackFavorite } = useLibrary();
	const filteredTracks = sortTracks(filterTracks(tracks, params?.q || ''), sortKey, sortKey !== 'dateAdded');

	return (
		<ScrollView>
			<View className="px-3 pt-3">
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
					{sortOptions.map((option) => (
						<Pressable
							key={option}
							className="mr-2 rounded-full px-3 py-2"
							style={{ backgroundColor: sortKey === option ? colors.primary : '#18181b' }}
							onPress={() => setSortKey(option)}
						>
							<Paragraph size="sm" weight="semibold">{option}</Paragraph>
						</Pressable>
					))}
				</ScrollView>
			</View>
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
