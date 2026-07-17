import { TouchableHighlight, View } from 'react-native';
import { Image } from 'expo-image';
import { defaultImages } from '@/constants/image';
import { Paragraph } from '@/components/Paragraph';
import { SideToLeft } from './RightSwipeAction';

const TrackListItem = ({}: TrackListItemProps) => {
	return (
		<SideToLeft onRightPress={() => {}}>
			<TouchableHighlight>
				<View className="mx-1 my-2 flex-row items-center gap-3 rounded-lg">
					<View>
						<Image
							className="h-[50px] w-[50px] rounded-[20px]"
							source={defaultImages.trackImage}
							contentFit="contain"
							alt="UnknownTrackAlbum"
							priority="normal"
						/>
					</View>
					<View className="justify-center">
						<Paragraph size="lg">Guess I'll Never Know sdasd</Paragraph>
						<Paragraph color="muted">Guess I'll asd</Paragraph>
					</View>
				</View>
			</TouchableHighlight>
		</SideToLeft>
	);
};

interface TrackListItemProps {
	trackImage?: string;
}

export default TrackListItem;
