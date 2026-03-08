import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/movieCard";
import SearchBar from "../components/searchBar";
import { fetchMovies } from "../services/api";
import { updateSearchCount } from "../services/appwrite";
import useFetch from "../services/useFetch";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, loading, fetchData, reset } = useFetch(
    () => fetchMovies({ query: searchQuery }),
    false,
  );
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        const result = await fetchData();
        if (result?.length > 0 && result?.[0]) {
          await updateSearchCount(searchQuery, result[0]);
        }
      } else {
        reset();
      }
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full"
        resizeMode="cover"
      />
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
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 self-center mt-20"
              resizeMode="contain"
            />
            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {error && (
              <Text className="font-bold text-white mt-10 self-center">
                Error: {error?.message}
              </Text>
            )}
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="self-center mt-12"
              />
            )}
            {!loading && !error && searchQuery.trim() && data?.length > 0 && (
              <Text className="text-white font-bold">
                Search Results for{" "}
                <Text className="text-accent uppercase">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="self-center mt-5">
              <Text className="text-light-200">
                {searchQuery.trim()
                  ? "No results Found"
                  : "Search for any movies"}
              </Text>
            </View>
          ) : null
        }
        className="px-5"
      />
    </View>
  );
};

export default Search;
