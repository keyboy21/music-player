import '@/styles/global.css';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCallback, useEffect } from 'react';
import { setBackgroundColorAsync } from 'expo-system-ui';
import { useColorScheme } from 'react-native';
import { colors } from '@/configs/style.config';

// SplashScreen.preventAutoHideAsync();

const App = () => {
     const colorScheme = useColorScheme() || "light";

     // const handleTrackPlayerLoaded = useCallback(() => {
     //      SplashScreen.hideAsync()
     // }, [])

     // useLogTrackPlayerState()


     return (
          <SafeAreaProvider>
               <GestureHandlerRootView className='flex-1'>
                    <RootNavigation />
                    <StatusBar />
               </GestureHandlerRootView>
          </SafeAreaProvider>
     )
}

const RootNavigation = () => {
     return (
          <Stack>
               <Stack.Screen name="(tabs)"
                    options={{
                         headerShown: false,
                    }}
               />
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
     )
}

export default App;