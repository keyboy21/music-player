import { Paragraph } from '@/components/Paragraph';
import { colors } from '@/configs/style.config';
import { defaultImages } from '@/constants/image';
import { useLibrary } from '@/store/library';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

const PlayerScreen = () => {
	const { currentTrack, isFavorite, toggleTrackFavorite } = useLibrary();

	if (!currentTrack) {
		return (
			<View className="flex-1 items-center justify-center bg-black px-6">
				<Paragraph size="xl" weight="semibold">No track selected</Paragraph>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-black px-6 pt-20">
			<Image className="aspect-square w-full rounded-[32px]" source={currentTrack.artwork ?? defaultImages.trackImage} contentFit="cover" />
			<View className="mt-8 flex-row items-center justify-between">
				<View className="flex-1 pr-4">
					<Paragraph size="3xl" weight="bold" numberOfLines={2}>{currentTrack.title}</Paragraph>
					<Paragraph size="lg" color="muted" className="mt-2" numberOfLines={1}>{currentTrack.artist}</Paragraph>
					{currentTrack.album ? <Paragraph color="muted" className="mt-1" numberOfLines={1}>{currentTrack.album}</Paragraph> : null}
				</View>
				<Pressable onPress={() => toggleTrackFavorite(currentTrack)} accessibilityRole="button" accessibilityLabel="Toggle favourite">
					<FontAwesome name={isFavorite(currentTrack) ? 'heart' : 'heart-o'} size={30} color={isFavorite(currentTrack) ? colors.primary : colors.text} />
				</Pressable>
			</View>
			<View className="mt-12 flex-row items-center justify-center gap-10">
				<Ionicons name="play-skip-back" size={36} color={colors.textMuted} />
				<View className="h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
					<Ionicons name="play" size={42} color={colors.text} />
				</View>
				<Ionicons name="play-skip-forward" size={36} color={colors.textMuted} />
			</View>
			<Paragraph color="muted" className="mt-10 text-center">Playback wiring, queue controls, and local audio permissions are tracked in the roadmap.</Paragraph>
		</View>
	);
};

export default PlayerScreen;
