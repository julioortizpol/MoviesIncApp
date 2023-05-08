import { useState, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Movies } from '../types/MovieDB';
import { MovieCard } from '../Components/MovieCard';
import { sortMoviesByTitle } from '../utils';
import { fetchMovies } from '../services/MovieDb';
import { MoviesScreenNavigationProp } from '../types/Navegation';


const MoviesScreen: React.FC<MoviesScreenNavigationProp> = ({ navigation }) => {
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
    <FlatList
      style={{ flex: 1 }}
      data={movies}
      renderItem={({ item }) => 
      <MovieCard
        movie={item}
        onPress={() => {
          navigation.navigate('MoviesDetails', { movieId: item.id })
        }}
      />
      }
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default MoviesScreen