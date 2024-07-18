import { Paragraph } from '@/components/Paragraph'
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
            <Paragraph
              size='lg'
              fontStyle='italic'
              className='text-red-600 mx-auto'
            >
              No results found{" "}
            </Paragraph>
          </View>)}
      />
    </ScrollView>
  )
}

export default SongScreen;