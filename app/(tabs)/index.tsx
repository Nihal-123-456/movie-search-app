import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/movieCard";
import SearchBar from "../components/searchBar";
import TrendingCard from "../components/trendingCard";
import { fetchMovies } from "../services/api";
import { getTrendingMovies } from "../services/appwrite";
import useFetch from "../services/useFetch";

export default function Index() {
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const { data, loading, error } = useFetch(() => fetchMovies({ query: "" }));
  const router = useRouter();
  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full"
        resizeMode="cover"
      />
      <View className="px-5 flex-1">
        <Image
          source={icons.logo}
          className="mx-auto w-12 h-10 mt-20"
          resizeMode="contain"
        />
        {loading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="self-center mt-12"
          />
        ) : error || trendingError ? (
          <Text className="font-bold text-white mt-10 self-center">
            Error: {error?.message} || {trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <FlatList
              data={data}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                gap: 20,
                paddingRight: 7,
                marginVertical: 10,
              }}
              className="mt-2"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
              ListHeaderComponent={
                <>
                  <SearchBar
                    onPress={() => {
                      router.push("/search");
                    }}
                    placeholder="Search for a movie"
                  />
                  <Text className="text-white font-bold mt-5 mb-3">
                    Trending Movies
                  </Text>
                  {trendingMovies && (
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={() => <View className="w-5" />}
                      data={trendingMovies}
                      renderItem={({ item, index }) => (
                        <TrendingCard movie={item} index={index} />
                      )}
                      keyExtractor={(item) => item.movieId.toString()}
                      className="pl-3"
                    />
                  )}
                  <Text className="text-white font-bold mt-7">
                    Latest Movies
                  </Text>
                </>
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
