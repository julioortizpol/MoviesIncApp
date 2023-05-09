import { useState, useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text, StyleSheet, Alert } from 'react-native';
import type { Movies } from '../types/MovieDB';
import { MovieCard } from '../Components/MovieCard';
import { sortMoviesByTitle } from '../utils';
import { fetchMovies } from '../services/MovieDb';
import type { MoviesScreenNavigationProp } from '../types/Navigation';
import { useErrors } from '../hooks';
import { MovieListSubHeader } from '../Components/MovieListSubHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const MoviesScreen: React.FC<MoviesScreenNavigationProp> = ({ navigation }) => {
  const [movies, setMovies] = useState<Movies>();
  const [fechingMovies, setFechingMovies] = useState<boolean>(false);
  const favMovies = useSelector((state: RootState) => state.favMovies.favMovies)
  const [selectedMovieList, setSelectedMovieList] = useState('nowPlaying')
  const setErrors = useErrors();

  const handleFetchMovies = useCallback(async () => {
    setFechingMovies(true)
    setErrors(undefined)
    fetchMovies().then((movies) => {
      const orderedMovies = sortMoviesByTitle(movies)
      setMovies(orderedMovies);
      setFechingMovies(false)
    })
      .catch((err) => {
        setFechingMovies(false)
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

  useEffect(() => {
    if(favMovies.length < 1) setSelectedMovieList('nowPlaying')
  }, [favMovies]);

  return (
    <View>
      {
        (fechingMovies) ?
          <ActivityIndicator /> :
          (movies &&
            <View>
              <FlatList
                data={selectedMovieList == 'nowPlaying' ? movies : favMovies}
                ListHeaderComponent={
                  <MovieListSubHeader
                    nowPlayingTabAction={() => {
                      setSelectedMovieList('nowPlaying')
                    }}
                    favMoviesTapAction={() => {
                      setSelectedMovieList('favMovies')
                    }}
                  />
                }
                stickyHeaderIndices={[0]}
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
            </View>
          )
      }
    </View>
  );
};

export default MoviesScreen

