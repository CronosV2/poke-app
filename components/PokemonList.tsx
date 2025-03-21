import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image  } from "react-native";
import { pokeApi, Pokemon, PokemonListResponse } from "../services/pokeApi";
import axios from "axios";

interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
}   



export const PokemonList = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState(true);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    useEffect(() => {
        axios.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon').then(response => {
            Promise.all(response.data.results.map(pokemon => 
                axios.get<Pokemon>(pokemon.url)
            )).then(details => {
                setPokemons(details.map(detail => detail.data));
            });
        });
    }, []);

    return (
        <View className="flex-1 bg-red-600">
              <Text className="text-center text-2xl font-bold text-white">Pokemons</Text>
              <FlatList
                contentContainerStyle={{ padding: 20 }}
                numColumns={2}
                data={pokemons}
                renderItem={({ item }) => (
                    <View className="bg-white rounded-lg p-4 m-2">
                        <Image source={{ uri: item.sprites.front_default }} className="w-20 h-20" />
                        <Text className="text-center text-lg font-bold">{item.name}</Text>
                    </View>
                )}
              />
        </View>
    );
};

