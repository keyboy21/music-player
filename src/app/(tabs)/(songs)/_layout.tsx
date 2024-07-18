import { StackScreenOptions } from "@/configs/stack-screen.options";
import { colors } from "@/configs/style.config"
import { Stack, useRouter } from "expo-router"

const SongScreenLayout = () => {
     const router = useRouter();
     return (
          <Stack screenOptions={{
               contentStyle: { backgroundColor: colors.background },
          }}>
               <Stack.Screen name="index"
                    options={{
                         headerTitle: 'Songs',
                         ...StackScreenOptions,
                         headerSearchBarOptions: {
                              headerIconColor: colors.text,
                              tintColor: colors.primary,
                              textColor: colors.text,
                              onChangeText: (event) => {
                                   router.setParams({
                                        q: event.nativeEvent.text,
                                   });
                              },
                         }
                    }}
               />
          </Stack>
     )
}

export default SongScreenLayout
