import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Movie } from './MovieDB';

export type RootStackParamList = {
    MoviesScreen: undefined, // undefined because you aren't passing any params to the home screen
    MoviesDetails: {movieId: number},
};

export type MoviesScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MoviesScreen'
>;

export type MoviesDetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MoviesDetails'
>;