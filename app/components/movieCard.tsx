import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          resizeMode="cover"
          className="w-full h-52 rounded-lg"
        />
        <Text className="text-sm text-white font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row justify-start items-center gap-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold">
            {vote_average.toFixed(1)}/10
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-xs text-light-300">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs text-light-300 uppercase">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
