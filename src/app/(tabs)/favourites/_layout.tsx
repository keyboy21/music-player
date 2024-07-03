import { StackScreenWithSearchBar } from "@/configs/layout.config"
import { Stack } from "expo-router"
import { View } from "react-native"

const FavoritsScreenLayout = () => {
     return (
          <Stack>
               <Stack.Screen
                    name="index"
                    options={{
                         headerTitle: 'Favourites',
                         ...StackScreenWithSearchBar,
                    }}
               />
          </Stack>
     )
}

export default FavoritsScreenLayout
