import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <>
      <View>
        <Text className="text-red-500">Hello</Text>
      </View>
      <ScreenContent title="Home" path="App.tsx" />
      <StatusBar style="auto" />
    </>
  );
}
