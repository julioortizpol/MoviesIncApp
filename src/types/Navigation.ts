import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Movie } from './MovieDB';

export type RootStackParamList = {
    MoviesScreen: undefined, // undefined because you aren't passing any params to the home screen
    MoviesDetails: {movieId: number},
    RecomendedMovies: {movieId: number}
};

export type MoviesScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MoviesScreen'
>;

export type RecomendedMoviesScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'RecomendedMovies'
>;

export type MoviesDetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MoviesDetails'
>;