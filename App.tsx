import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { PokemonList } from './components/PokemonList';

import './global.css';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <PokemonList />
    </SafeAreaView>
  );
}
