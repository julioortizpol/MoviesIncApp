import { useState, useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Movies } from '../types/MovieDB';
import { MovieCard } from '../Components/MovieCard';
import { sortMoviesByTitle } from '../utils';
import { fetchMovies } from '../services/MovieDb';
import { MoviesScreenNavigationProp } from '../types/Navegation';
import { useErrors } from '../hooks';

const MoviesScreen: React.FC<MoviesScreenNavigationProp> = ({ navigation }) => {
  const [movies, setMovies] = useState<Movies>();
  const setErrors = useErrors();

  const handleFetchMovies = useCallback(async () => {
    setErrors(undefined)
    fetchMovies().then((movies) => {
      const orderedMovies = sortMoviesByTitle(movies)
      setMovies(orderedMovies);
    })
      .catch((err) => {
        if (err instanceof Error) {
          setErrors(err.message);
        } else {
          setErrors('No se pudo cargar la lista de peliculas');
        }
      });
  }, []);

  useEffect(() => {
    handleFetchMovies();
  }, []);

  return (
    (movies) ? 
    <FlatList
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
    : <ActivityIndicator />
    
  );
};

export default MoviesScreen