import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from './style.config'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
     headerStyle: {
          backgroundColor: colors.primary
     },
     headerTintColor: colors.text,
     headerTitleStyle: {
          fontWeight: 'bold',
     },
     headerShadowVisible: false,
     headerTitleAlign: 'center'
}