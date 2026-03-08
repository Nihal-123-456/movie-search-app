import { icons } from "@/constants/icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getMovieDetails } from "../services/api";
import useFetch from "../services/useFetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="mt-5 px-5">
    <Text className="text-light-100 font-bold">{label}</Text>
    <Text className="text-light-200 text-sm mt-2">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useFetch(() =>
    getMovieDetails(id as string),
  );
  const router = useRouter();
  return (
    <View className="bg-primary flex-1">
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="self-center mt-48"
        />
      ) : error ? (
        <Text className="font-bold text-white mt-48 self-center">
          Error: {error?.message}
        </Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
              }}
              className="h-[500px] w-full"
              resizeMode="stretch"
            />
            <Text className="text-white px-5 font-bold text-xl mt-3">
              {data?.title}
            </Text>
            <View className="px-5 mt-2 flex-row gap-2">
              <Text className="text-light-200 text-sm">
                {data?.release_date.split("-")[0]}
              </Text>
              <Text className="text-light-200 text-sm">{data?.runtime}m</Text>
            </View>
            <View className="px-2 py-1 mx-3 mt-2 flex-row items-center gap-1 bg-dark-100 rounded-md self-start">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white text-sm font-bold">
                {data?.vote_average.toFixed(1)}/10
              </Text>
              <Text className="text-light-200 text-sm">
                ({data?.vote_count} votes)
              </Text>
            </View>
            <MovieInfo label="Overview" value={data?.overview} />
            <MovieInfo
              label="Genres"
              value={data?.genres?.map((g: any) => g.name).join(" - ")}
            />
            <View className="flex-row justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={`$${data?.budget / 1000000} million`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${(data?.revenue / 1000000).toFixed(2)} million`}
              />
            </View>
            <MovieInfo
              label="Production Companies"
              value={data?.production_companies
                ?.map((c: any) => c.name)
                .join(" - ")}
            />
          </ScrollView>
          <TouchableOpacity
            className="absolute bottom-11 bg-accent flex-row w-full justify-center items-center gap-1 rounded-full py-3"
            onPress={router.back}
          >
            <Image
              source={icons.arrow}
              tintColor="#fff"
              className="rotate-180 size-5"
            />
            <Text className="text-white text-xl font-bold">Go Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default MovieDetails;
