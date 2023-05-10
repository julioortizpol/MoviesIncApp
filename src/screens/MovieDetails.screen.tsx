import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { fetchMovieDetails } from '../services/MovieDb';
import { MoviesDetailsScreenNavigationProp } from '../types/Navigation';
import type { Movie } from '../types/MovieDB';
import { formatDate, getImageURL } from '../utils';
import { FlatList } from 'react-native-gesture-handler';
import { MovieGenres } from '../Components/MovieGenres';
import { ActorComponent } from '../Components/ActorComponent';
import StarRatingBar from '../Components/RatingStars';
import { useErrors } from '../hooks';
import { FavMovieButton } from '../Components/FavMovieButton';

const MovieDetails: React.FC<MoviesDetailsScreenNavigationProp> = ({ route, navigation }) => {
  const [movie, setMovie] = useState<Movie | undefined>();
  const setErrors = useErrors();

  const handleFetchMovieDetails = useCallback(async () => {
    setErrors(undefined)

    fetchMovieDetails(route.params.movieId).then((movie) => {
      setMovie(movie);
    }).catch((err) => {
      if (err instanceof Error) {
        setErrors(err.message);
      } else {
        setErrors('No se pudo cargar los detalles de la pelicula');
      }
    });
  }, []);

  useEffect(() => {
    handleFetchMovieDetails();
  }, []);
  return (
    <View style={styles.container}>
      {movie ?
        (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.93 }}>
              <FlatList
                style={{ paddingHorizontal: 10 }}
                ListHeaderComponent={
                  () => {
                    return (
                      <View>
                        <Image source={{ uri: getImageURL(movie.posterPath) }} style={styles.posterImageStyle} resizeMode='contain' />
                        <Text style={styles.title}>{movie?.title}</Text>
                        <Text style={styles.textContent}>Fecha de estreno: {formatDate(movie.releaseDate)}</Text>
                        <Text style={styles.textContent}>Puntuacion: {movie.voteAverage.toFixed(1)} / 10</Text>
                        <Text style={{ ...styles.textContent, textAlign: 'justify' }}>{movie.overview}</Text>

                        
                        <StarRatingBar movieId={route.params.movieId} />
                        {movie.genres && <MovieGenres genres={movie.genres} />}
                        <Text style={styles.subTitle}>Actores:</Text>
                      </View>
                    )
                  }
                }
                keyExtractor={(item) => item.id.toString()}
                data={movie.actors}
                renderItem={({ item }) =>
                  <ActorComponent actor={item} />
                }
              />
            </View>
            <View style={{ flex: 0.07 }} >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{flex:1,     width: '50%',}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                  onPress={() => navigation.navigate('RecomendedMovies', { movieId: route.params.movieId })}>
                  <Text style={styles.buttonTextStyle}>
                    peliculas similares
                  </Text>
                </TouchableOpacity>
                </View>
                <View style={{flex:1,     width: '50%',}}>
                <FavMovieButton movie={movie} />
                </View>
              </View>
            </View>
          </View>
        )
        : <ActivityIndicator />}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: theme.clearDarkMoon
  },
  posterImageStyle: 
    { height: 300, marginTop: 8 },
  title: {
    ...theme.title,
    textAlign: 'center',
    marginTop: 10
  },
  textContent: {
    ...theme.defaultText,
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    ...theme.subTitle,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  buttonStyle: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#5f4c6c',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MovieDetails