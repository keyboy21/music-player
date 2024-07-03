import TrackListItem from '@/components/TrackListItem'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { FlashList } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Keyboard, ScrollView, View, Text } from 'react-native'

const DATA = [
  {
    title: "First User",
  },
  {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  }, {
    title: "First Item",
  },
  {
    title: "First Item",
  }, {
    title: "First Item",
  },
];
const SongScreen = () => {

  const params = useLocalSearchParams<{ q?: string }>();
  const searchText = params?.q?.toLowerCase() || "";
  
  const filteredSpeakers = DATA.filter((speaker) => {
    if (!searchText) {
      return true;
    }
    return speaker.title.toLowerCase().includes(searchText);
  });

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View className='flex-1'>
      <ScrollView>
        <FlashList
          className="mx-2"
          scrollToOverflowEnabled
          contentInsetAdjustmentBehavior="automatic"
          onScrollBeginDrag={dismissKeyboard}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: 16
          }}
          estimatedItemSize={100}
          data={filteredSpeakers}
          renderItem={({ item }) => <TrackListItem />}
          ItemSeparatorComponent={() => (
            <View className="opacity-20 border-textMuted border my-2 ml-20" />
          )}
          ListEmptyComponent={() => (
            <View>
              <Text className='text-red-600 mx-auto text-xl italic'>
                No results found{" "}
              </Text>
            </View>)}
        />
      </ScrollView>
    </View >
  )
}

export default SongScreen;