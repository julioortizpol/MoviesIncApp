import { StyleSheet, View, Text, Image, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { theme } from '../theme';
import { addFavMovie, deleteFavMovie } from '../reducers/favMovies'
import { Movie } from '../types/MovieDB';
import { useEffect, useState } from 'react';

type FavMovieButtonProps = {
  movie: Movie,
  style?: StyleProp<ViewStyle>
}

export const FavMovieButton: React.FC<FavMovieButtonProps> = ({movie, style}: FavMovieButtonProps) => {
  const favMovies = useSelector((state: RootState) => state.favMovies.favMovies)
  const [isThisFav, setIsThisFav] = useState(Boolean(favMovies.find(favMovie => favMovie.id === movie.id)))

  useEffect(() => {
    setIsThisFav(Boolean(favMovies.find(favMovie => favMovie.id === movie.id)))
  }, [favMovies])

  const dispatch = useDispatch()
  return (
  <TouchableOpacity
    style={(style) ? style : styles.buttonStyle}
    onPress={() => {
      if(isThisFav){
        dispatch(deleteFavMovie(movie))
      }else{
        dispatch(addFavMovie(movie))
      }
      
    }}>  
    <Text style={styles.buttonTextStyle}>
      {isThisFav ? 'Favorita':'Añadir a favoritas'}
    </Text>
    <Image
      style={styles.heartImageStyle}
      source={isThisFav ? require('../assets/heart_filled.png'):require('../assets/heart.png')}
    />
  </TouchableOpacity>)
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    flexDirection:'row',
    backgroundColor: '#302e4c',
  },
  buttonTextStyle: {
    textAlign:'center',
    paddingEnd: 10,
    color: '#fff',
  },
  heartImageStyle: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
  }
});