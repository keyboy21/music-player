import '../../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LibraryProvider } from '@/store/library';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';

const App = () => {
	useSetupTrackPlayer({});

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView className="flex-1">
				<LibraryProvider>
					<RootNavigation />
					<StatusBar />
				</LibraryProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
};

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="player"
				options={{
					presentation: 'card',
					gestureEnabled: true,
					gestureDirection: 'vertical',
					animationDuration: 400,
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default App;
