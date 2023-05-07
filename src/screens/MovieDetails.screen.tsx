import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { sortMoviesByTitle } from '../utils';
import { fetchMovies } from '../services/MovieDb';
import { MoviesDetailsScreenNavigationProp } from '../types/Navegation';

const MovieDetails: React.FC<MoviesDetailsScreenNavigationProp> = ({route, navigation}) => {

  return (
    <View></View>
  );
};


export default MovieDetails