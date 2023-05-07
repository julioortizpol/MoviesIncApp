import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Movie, Movies, MovieResponse } from './types/Movie';
import { MovieCard } from './Components/MovieCard';
import { MOVIES_API_BASE_URL, MOVIES_API_KEY } from "@env"
import { theme } from './theme';
import { sortMoviesByTitle } from './utils';
import { fetchMovies } from './services/MovieDb';

const apiLanguage = 'es'
const URL = `${MOVIES_API_BASE_URL}/now_playing?api_key=${MOVIES_API_KEY}&language=${apiLanguage}S&page=1`;

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movies>();
  const [errors, setErrors] = useState<String>();

  const handleFetchMovies = useCallback(async () => {
    fetchMovies().then((movies) => {
      const orderedMovies = sortMoviesByTitle(movies)
      setMovies(orderedMovies);
    })
    .catch((err) => {
      if (err instanceof Error) {
        setErrors(err.message);
    } else {
      setErrors('An unexpected error occurred');
    }
    });    
  }, []);
  
  useEffect(() => {
    handleFetchMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container} > 
    <FlatList
        style={{flex:1}}
        data={movies}
        renderItem={({item}) => <MovieCard 
        id={item.id}
        title={item.title} 
        voteAverage={item.voteAverage}
        posterPath={item.posterPath}
        releaseDate={item.releaseDate}
        />
      }
        keyExtractor={item => item.id.toString()}
      />
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkMoon,
  }
});

export default App