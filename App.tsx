import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Movies } from './Models/Movie';
import { MovieCard } from './Components/MovieCard';
import { MOVIES_API_BASE_URL, MOVIES_API_KEY } from "@env"
import { theme } from './theme';
import { sortMoviesByTitle } from './utils';

const apiLanguage = 'es'
const URL = `${MOVIES_API_BASE_URL}/now_playing?api_key=${MOVIES_API_KEY}&language=${apiLanguage}S&page=1`;

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movies>();

  const handleFetchMovies = useCallback(async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const movies = await response.json();
      const orderedMovies = sortMoviesByTitle(movies.results)
      setMovies(orderedMovies);
    }
  }, []);
  
  useEffect(() => {
    handleFetchMovies();
  }, []);

  return <SafeAreaView style={styles.container} > 
    <FlatList
        style={{flex:1}}
        data={movies}
        renderItem={({item}) => <MovieCard 
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
    backgroundColor: theme.darkMoon,
  }
});

export default App