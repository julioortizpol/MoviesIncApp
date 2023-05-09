import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { fetchMovieDetails } from '../services/MovieDb';
import { MoviesDetailsScreenNavigationProp } from '../types/Navegation';
import {  Movie } from '../types/MovieDB';
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

  //   navigation.navigate('MoviesDetails', { movieId: item.id })

  useEffect(() => {
    handleFetchMovieDetails();
  }, []);
  return (
    <View style={styles.container}>
      {movie ? 
      <FlatList
      style={{paddingHorizontal:10}}
        ListHeaderComponent={
          () => {
            return (
              <View>
                <Image source={{ uri: getImageURL(movie.posterPath)}} style={{ height: 320 }} resizeMode='contain' />
                <Text style={styles.title}>{movie?.title}</Text>
                <Text style={styles.textContent}>Fecha de estreno: {formatDate(movie.releaseDate)}</Text>
                <Text style={styles.textContent}>Puntuacion: {movie.voteAverage}/10</Text>
                <Text style={{ ...styles.textContent, textAlign: 'justify' }}>{movie.overview}</Text>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('RecomendedMovies', { movieId: route.params.movieId })}>
                  <Text style={styles.buttonTextStyle}>
                    peliculas similares
                  </Text>
                </TouchableOpacity>
                <FavMovieButton />
                <StarRatingBar movieId={route.params.movieId}/>
                {movie.genres && <MovieGenres genres={movie.genres}/>}
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
      />  : <ActivityIndicator />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: theme.clearDarkMoon
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
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
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#2329dc',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default MovieDetails