import { StackScreenWithSearchBar } from "@/configs/layout.config"
import { colors } from "@/configs/style.config"
import { Stack, useRouter } from "expo-router"

const SongScreenLayout = () => {
     const router = useRouter();
     return (
          <Stack>
               <Stack.Screen name="index"
                    options={{
                         headerTitle: 'Songs',
                         ...StackScreenWithSearchBar,
                         headerSearchBarOptions: {
                              headerIconColor: colors.text,
                              tintColor: colors.primary,
                              textColor: colors.text,
                              onChangeText: (event) => {
                                   router.setParams({
                                        q: event.nativeEvent.text,
                                   });
                              }
                         }
                    }}
               />
          </Stack>
     )
}

export default SongScreenLayout
