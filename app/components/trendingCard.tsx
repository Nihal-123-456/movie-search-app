import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { movieId, title, posterUrl },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movieId}`} asChild>
      <TouchableOpacity className="w-32">
        <Image
          source={{ uri: posterUrl }}
          resizeMode="cover"
          className="w-full h-48 rounded-lg"
        />
        <View className="absolute bottom-14 -left-3.5">
          <MaskedView
            maskElement={
              <Text className="text-white text-6xl font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              resizeMode="cover"
              className="size-14"
            />
          </MaskedView>
        </View>
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
