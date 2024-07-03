import { FC } from "react";
import { TouchableHighlight, View, Text } from "react-native"
import { Image } from 'expo-image';
import { defaultImages } from "@/constants/image";

const TrackListItem: FC<TrackListItemProps> = () => {
     return (
          <TouchableHighlight>
               <View className="flex flex-row items-center mx-1 my-2 gap-3 rounded-lg">
                    <View>
                         <Image
                              style={{
                                   width: 50,
                                   height: 50,
                                   borderRadius: 20
                              }}
                              className="rounded-2xl"
                              source={defaultImages.trackImage}
                              contentFit="contain"
                              alt="UnknownTrackAlbum"
                              priority={'normal'}
                         />
                    </View>
                    <View className="flex flex-col justify-center">
                         <Text className="text-white text-lg">
                              Guess I'll Never Know sdasd
                         </Text>
                         <Text className="text-base text-gray-500">
                              Guess I'll asd
                         </Text>
                    </View>
               </View>
          </TouchableHighlight >
     )
}

interface TrackListItemProps {
     // trackName: string;
     trackImage?: string;
}

export default TrackListItem
