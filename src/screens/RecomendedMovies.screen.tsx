import { useState, useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import type { Movies } from '../types/MovieDB';
import { MovieCard } from '../Components/MovieCard';
import { sortMoviesByTitle } from '../utils';
import { fetchRecomendedMovies } from '../services/MovieDb';
import type { RecomendedMoviesScreenNavigationProp } from '../types/Navegation';
import { useErrors } from '../hooks';

const RecomendedMovies: React.FC<RecomendedMoviesScreenNavigationProp> = ({ route, navigation }) => {
  const [movies, setMovies] = useState<Movies>();
  const setErrors = useErrors();

  const handleFetchRecomendedMovies = useCallback(async () => {
    setErrors(undefined)
    fetchRecomendedMovies(route.params.movieId).then((movies) => {
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
    handleFetchRecomendedMovies();
  }, []);

  return (
    (movies) ? 
    <FlatList
      data={movies}
      renderItem={({ item }) => 
      <MovieCard
        movie={item}
      />
      }
      keyExtractor={item => item.id.toString()}
    />
    : <ActivityIndicator />
    
  );
};

export default RecomendedMovies