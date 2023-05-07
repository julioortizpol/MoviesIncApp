import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { theme } from '../theme';
import { fetchMovieDetails } from '../services/MovieDb';
import { MoviesDetailsScreenNavigationProp } from '../types/Navegation';
import {  Movie } from '../types/Movie';
import { formatDate } from '../utils';
import { FlatList } from 'react-native-gesture-handler';
import { MovieGenres } from '../Components/MovieGenres';
import { ActorComponent } from '../Components/ActorComponent';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const MovieDetails: React.FC<MoviesDetailsScreenNavigationProp> = ({ route, navigation }) => {
  const [movie, setMovie] = useState<Movie>();
  console.log(movie)
  const [errors, setErrors] = useState<String>();

  const handleFetchMovieDetails = useCallback(async () => {
    fetchMovieDetails(route.params.movieId).then((movie) => {
      setMovie(movie);
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
    handleFetchMovieDetails();
  }, []);

  return (
    <View style={styles.container}>
      {movie &&
        <FlatList
        style={{paddingHorizontal:10}}
          ListHeaderComponent={
            () => {
              return (
                <View>
                  <Image source={{ uri: `${IMAGE_BASE_URL}${movie?.posterPath}` }} style={{ height: 320 }} resizeMode='contain' />
                  <Text style={styles.title}>{movie?.title}</Text>
                  <Text style={styles.textContent}>Fecha de estreno: {((formatDate(movie.releaseDate)))}</Text>
                  <Text style={styles.textContent}>Puntuacion: {movie.voteAverage}/10</Text>
                  <Text style={{ ...styles.textContent, textAlign: 'justify' }}>{movie.overview}</Text>
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
        />
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
  }
});

export default MovieDetails