import { StackScreenWithSearchBar } from "@/configs/layout.config"
import { Stack } from "expo-router"
import { View } from "react-native"

const PlayListScreenLayout = () => {
     return (
          <Stack>
               <Stack.Screen name="index"
                    options={{
                         headerTitle: 'Playlist',
                         ...StackScreenWithSearchBar,
                    }}
               />
          </Stack>
     )
}

export default PlayListScreenLayout
