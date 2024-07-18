import { Animated, View, ViewProps } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import { useRef } from "react";
import { Swipeable, RectButton } from "react-native-gesture-handler";

export const SideToLeft = ({ onRightPress, children }: SlideToLeftProps) => {
     const swipeableRowRef = useRef<Swipeable>(null);

     const close = () => {
          swipeableRowRef.current?.close();
     };

     return (
          <Swipeable friction={2}
               enableTrackpadTwoFingerGesture
               rightThreshold={80}
               useNativeAnimations={true}
               ref={swipeableRowRef}
               renderRightActions={(progress, dragX) =>
                    <RightRemoveSwipeAction
                         progress={progress}
                         dragX={dragX}
                         close={close}
                         onRightPress={onRightPress}
                    />
               }
          >
               {children}
          </Swipeable>
     )

}

interface SlideToLeftProps extends ViewProps {
     onRightPress?: () => void;
}

const RightRemoveSwipeAction = ({ progress, dragX, close, onRightPress }: RightActionProps) => {

     const trans = dragX.interpolate({
          inputRange: [-101, -100, -50, 0],
          outputRange: [-1, 0, 0, 20],
     });

     const opacity = dragX.interpolate({
          inputRange: [-80, 0],
          outputRange: [1, 0],
          extrapolate: "clamp",
     });

     return (
          <View className="flex-1 justify-center items-end bg-red-500 w-16">
               <RectButton onPress={() => {
                    // onRightPress();
                    close();
               }}>
                    <Animated.View style={{ transform: [{ translateX: trans, }], opacity }}>
                         <Feather name="trash-2" size={25} color="white" />
                    </Animated.View>
               </RectButton>
          </View>
     )
}

interface RightActionProps {
     progress: Animated.AnimatedInterpolation<number>
     dragX: Animated.AnimatedInterpolation<number>
     close: () => void
     onRightPress?: () => void
}
