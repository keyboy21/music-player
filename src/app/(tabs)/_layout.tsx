import { TabbarIconSize, colors, fontSize } from '@/configs/style.config';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabsNavigation = () => {
     return (
          <Tabs
               screenOptions={{
                    tabBarActiveTintColor: colors.text,
                    tabBarInactiveTintColor: colors.textMuted,
                    tabBarLabelStyle: {
                         fontSize: fontSize.xs,
                         fontWeight: 'bold',
                    },
                    headerShown: false,
                    tabBarStyle: {
                         position: 'absolute',
                         borderTopLeftRadius: 20,
                         borderTopRightRadius: 20,
                         borderTopWidth: 0,
                         height: 60,
                         backgroundColor: colors.primary,
                    },
               }}
          >
               <Tabs.Screen name='settings'
                    options={{
                         title: 'Settings',
                         tabBarIcon: ({ color }) =>
                              <Ionicons
                                   name="settings"
                                   size={TabbarIconSize}
                                   color={color}
                              />
                         ,
                    }}
               />
               <Tabs.Screen name='playlits'
                    options={{
                         title: 'Playlists',
                         tabBarIcon: ({ color }) =>
                              <MaterialCommunityIcons
                                   name="playlist-play"
                                   size={TabbarIconSize}
                                   color={color}
                              />
                         ,
                    }}
               />
               <Tabs.Screen name='favourites'
                    options={{
                         title: 'Favourites',
                         tabBarIcon: ({ color }) => {
                              return (
                                   <FontAwesome
                                        name="heart"
                                        size={TabbarIconSize}
                                        color={color}
                                   />
                              )
                         },
                    }}
               />
               <Tabs.Screen name='(songs)'
                    options={{
                         title: 'Songs',
                         tabBarIcon: ({ color }) =>
                              <Ionicons
                                   name="musical-notes-sharp"
                                   size={TabbarIconSize}
                                   color={color}
                              />
                         ,
                    }}
               />
          </Tabs>
     )
}

export default TabsNavigation
