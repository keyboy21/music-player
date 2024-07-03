import { colors } from "@/configs/style.config"
import { useNavigation } from "expo-router"
import { useLayoutEffect, useState } from "react"
import { SearchBarProps } from "react-native-screens"

const defaultSearchOptions: SearchBarProps = {
     tintColor: colors.primary,
     hideWhenScrolling: true,
}

export const useNavigationSearch = ({ searchBarOptions }: useNavigationSearchProps) => {
     const [search, setSearch] = useState('')

     const navigation = useNavigation();

     const handleOnChangeText: SearchBarProps['onChangeText'] = ({ nativeEvent: { text } }) => {
          setSearch(text)
     }

     useLayoutEffect(() => {
          navigation.setOptions({
               ...defaultSearchOptions,
               ...searchBarOptions,
               onChangeText: handleOnChangeText

          })
     }, [navigation, searchBarOptions])

     return search
}

interface useNavigationSearchProps {
     searchBarOptions: SearchBarProps;
}

export default useNavigationSearch
