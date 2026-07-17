import { TouchableHighlight, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { defaultImages } from '@/constants/image';
import { Paragraph } from '@/components/Paragraph';
import { SideToLeft } from './RightSwipeAction';
import { colors } from '@/configs/style.config';
import type { Track } from 'react-native-track-player';

const TrackListItem = ({ track, isFavorite = false, onFavoritePress, onPress }: TrackListItemProps) => {
	const router = useRouter();

	const handlePress = () => {
		onPress?.(track);
		router.push('/player');
	};

	return (
		<SideToLeft onRightPress={onFavoritePress ?? (() => {})}>
			<TouchableHighlight onPress={handlePress} underlayColor="rgba(255,255,255,0.08)">
				<View className="mx-1 my-2 flex-row items-center gap-3 rounded-lg pr-3">
					<Image
						className="h-[50px] w-[50px] rounded-[20px]"
						source={track.artwork ?? defaultImages.trackImage}
						contentFit="contain"
						alt={`${track.title ?? 'Unknown track'} album artwork`}
						priority="normal"
					/>
					<View className="flex-1 justify-center">
						<Paragraph size="lg" numberOfLines={1}>{track.title ?? 'Unknown title'}</Paragraph>
						<Paragraph color="muted" numberOfLines={1}>{track.artist ?? 'Unknown artist'}</Paragraph>
					</View>
					<FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={18} color={isFavorite ? colors.primary : colors.textMuted} />
				</View>
			</TouchableHighlight>
		</SideToLeft>
	);
};

interface TrackListItemProps {
	track: Track & { id?: string; artist?: string };
	isFavorite?: boolean;
	onFavoritePress?: () => void;
	onPress?: (track: Track & { id?: string }) => void;
}

export default TrackListItem;
