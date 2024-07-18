import { StackScreenOptions } from "@/configs/stack-screen.options"
import { colors } from "@/configs/style.config"
import { Stack } from "expo-router"
import { View } from "react-native"

const PlayListScreenLayout = () => {
     return (
          <Stack screenOptions={{
               contentStyle: { backgroundColor: colors.background },
          }}>
               <Stack.Screen name="index"
                    options={{
                         headerTitle: 'Playlist',
                         ...StackScreenOptions,
                    }}
               />
          </Stack>
     )
}

export default PlayListScreenLayout
