import { Paragraph } from '@/components/Paragraph';
import TrackListItem from '@/components/TrackListItem';
import { useLibrary } from '@/store/library';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';

const FavouritesScreen = () => {
	const { favorites, setCurrentTrackId, toggleTrackFavorite, isFavorite } = useLibrary();

	return (
		<FlashList
			className="mx-2"
			contentContainerClassName="pt-4 pb-24"
			data={favorites}
			renderItem={({ item }) => (
				<TrackListItem
					track={item}
					isFavorite={isFavorite(item)}
					onPress={() => item.id ? setCurrentTrackId(item.id) : undefined}
					onFavoritePress={() => toggleTrackFavorite(item)}
				/>
			)}
			ListEmptyComponent={() => (
				<View className="px-4 py-8">
					<Paragraph size="lg" weight="semibold">No favourites yet</Paragraph>
					<Paragraph color="muted" className="mt-2">Swipe a song or tap the heart to add it here.</Paragraph>
				</View>
			)}
		/>
	);
};

export default FavouritesScreen;
