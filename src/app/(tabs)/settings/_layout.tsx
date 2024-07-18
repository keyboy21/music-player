import { StackScreenOptions } from "@/configs/stack-screen.options"
import { colors } from "@/configs/style.config"
import { Stack } from "expo-router"

const SettingsScreenLayout = () => {
     return (
          <Stack screenOptions={{
               contentStyle: { backgroundColor: colors.background },
          }}>
               <Stack.Screen name="index"
                    options={{
                         headerTitle: 'Settings',
                         ...StackScreenOptions,
                    }}
               />
          </Stack>
     )
}

export default SettingsScreenLayout
