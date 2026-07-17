import { Paragraph } from '@/components/Paragraph';
import TrackListItem from '@/components/TrackListItem';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { Keyboard, ScrollView, View } from 'react-native';

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
        contentContainerClassName="pt-4"
        data={filteredSpeakers}
        renderItem={() => <TrackListItem />}
        ItemSeparatorComponent={() => <View className="my-2 ml-20 border-[0.5px] border-gray-400 opacity-20" />}
        ListEmptyComponent={() => (
          <View>
            <Paragraph
              size='lg'
              fontStyle='italic'
              color="error"
              className="self-center"
            >
              No results found{" "}
            </Paragraph>
          </View>)}
      />
    </ScrollView>
  )
}


export default SongScreen;
