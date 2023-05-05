import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text, Image } from 'react-native';
import { Movies } from './Models/Movie';
import { MovieCard } from './Components/MovieCard';
import { MOVIES_API_BASE_URL, MOVIES_API_KEY } from "@env"

const URL = `${MOVIES_API_BASE_URL}/now_playing?api_key=${MOVIES_API_KEY}&language=en-US&page=1`;

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movies>();

  const handleFetchMovies = useCallback(async () => {
    const response = await fetch(URL);
    console.log(movies)
    if (response.ok) {
      const movies = await response.json();
      setMovies(movies.results);
    }
  }, []);
  
  useEffect(() => {
    handleFetchMovies();
  }, []);

  return <SafeAreaView style={styles.container} > 
    <FlatList
        style={{flex:1}}
        data={movies}
        renderItem={({item}) => 
        <MovieCard 
        id={item.id}
        title={item.title} 
        vote_average={item.vote_average}
        poster_path={item.poster_path}
        release_date={item.release_date}
        />
      }
        keyExtractor={item => item.id.toString()}
      />
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100e2a',
  }
});
