import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import SearchBar from "../components/searchBar";
import MovieCard from "../components/MovieCard";

export default function Index() {

  const router= useRouter();

  const {data:movies,loading:moviesLoading,error:moviesError}=useFetch(()=>getMovies({query:''}))
    

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
  
      {moviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
      ) : moviesError ? (
        <Text>Error: {moviesError}</Text>
      ) : (
        <FlatList
          data={movies?.results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          className='px-5'
          renderItem={({ item }) => (
            <Text className="text-white text-sm">
              <MovieCard 
            {... item}
            
            /></Text>
          )}
          columnWrapperStyle={{
            justifyContent: 'center',
            gap:16,
            marginVertical: 16,
           }}
         
          scrollEnabled={true}
          ListHeaderComponent={
            <View className="px-5">
              <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
              <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
            </View>
          }
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          
        />
      )}
    </View>
  );
  
}
