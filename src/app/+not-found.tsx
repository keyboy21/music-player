import { Paragraph } from '@/components/Paragraph';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <View>
        <Paragraph>This screen doesn't exist.</Paragraph>
        <Link href="/">
          <Paragraph>Go to home screen!</Paragraph>
        </Link>
      </View>
    </>
  );
}
