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
              <Text className="text-center text-2xl font-bold p-4 top-4 text-white">Pokemons</Text>
              <FlatList className="flex-1 "
                contentContainerStyle={{ padding: 30 }}
                numColumns={3}
                data={pokemons}
                renderItem={({ item }) => (
                    <View className="bg-white rounded-lg p-6 m-2 flex-1 items-center justify-center mx-2">
                        <View className="items-center justify-center w-full">
                            <Image 
                                source={{ uri: item.sprites.front_default }} 
                                className="w-20 h-20 " 
                                resizeMode="contain"
                            />
                            <Text className="text-center text-xs font-bold capitalize mt-2" numberOfLines={1}>
                                {item.name}
                            </Text>
                        </View>
                    </View>
                )}
              />
        </View>
    );
};


