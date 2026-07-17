import { colors } from './style.config';

export const StackScreenOptions = {
	headerStyle: {
		backgroundColor: colors.primary,
	},
	headerTintColor: colors.text,
	headerTitleStyle: {
		fontWeight: 'bold' as const,
	},
	headerShadowVisible: false,
	headerTitleAlign: 'center' as const,
	gestureEnabled: true,
};
