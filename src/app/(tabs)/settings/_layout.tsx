import { StackScreenWithSearchBar } from "@/configs/layout.config"
import { Stack } from "expo-router"
import { View } from "react-native"

const SettingsScreenLayout = () => {
     return (
          <Stack>
               <Stack.Screen name="index"
                    options={{
                         headerTitle: 'Settings',
                         ...StackScreenWithSearchBar,
                    }}
               />
          </Stack>
     )
}

export default SettingsScreenLayout
