import Feather from '@expo/vector-icons/Feather';
import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

export const SideToLeft = ({ onRightPress, children }: SlideToLeftProps) => {
	return (
		<View className="flex-row items-stretch">
			<View className="flex-1">{children}</View>
			<Pressable
				accessibilityRole="button"
				onPress={onRightPress}
				className="w-16 items-center justify-center self-stretch bg-red-500"
			>
				<Feather name="trash-2" size={25} color="white" />
			</Pressable>
		</View>
	);
};

interface SlideToLeftProps {
	onRightPress?: () => void;
	children?: ReactNode;
}
