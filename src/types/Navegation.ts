import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Movie } from './Movie';

export type RootStackParamList = {
    MoviesScreen: undefined, // undefined because you aren't passing any params to the home screen
    MoviesDetails: {movieId: Number},
};

export type MoviesScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MoviesScreen'
>;

export type MoviesDetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MoviesDetails'
>;