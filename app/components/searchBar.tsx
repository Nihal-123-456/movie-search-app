import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center px-5 py-4 bg-dark-200 rounded-full">
      <Image
        source={icons.search}
        tintColor="#ab8bff"
        className="size-5"
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
