import { TouchableHighlight, View } from "react-native"
import { Image } from 'expo-image';
import { defaultImages } from "@/constants/image";
import { Paragraph } from "@/components/Paragraph";
import { SideToLeft } from "./RightSwipeAction";

const TrackListItem = ({ }: TrackListItemProps) => {
     return (
          <SideToLeft onRightPress={() => { }} >
               <TouchableHighlight >
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
                              <Paragraph size="lg" className="text-white">
                                   Guess I'll Never Know sdasd
                              </Paragraph>
                              <Paragraph className="text-gray-500">
                                   Guess I'll asd
                              </Paragraph>
                         </View>
                    </View>
               </TouchableHighlight>
          </SideToLeft>

     )
}

interface TrackListItemProps {
     // trackName: string;
     trackImage?: string;
}

export default TrackListItem
