import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { theme } from '../theme';
import { addFavMovie, deleteFavMovie } from '../reducers/favMovies'
import { Movie } from '../types/MovieDB';
import { useEffect, useState } from 'react';

type FavMovieButtonProps = {
  movie: Movie
}

export const FavMovieButton: React.FC<FavMovieButtonProps> = ({movie}: FavMovieButtonProps) => {
  const favMovies = useSelector((state: RootState) => state.favMovies.favMovies)
  const [isThisFav, setIsThisFav] = useState(Boolean(favMovies.find(favMovie => favMovie.id === movie.id)))

  useEffect(() => {
    setIsThisFav(Boolean(favMovies.find(favMovie => favMovie.id === movie.id)))
  }, [favMovies])

  const dispatch = useDispatch()
  return (<View style={{ marginTop: 20, }}>
    <TouchableOpacity
      style={styles.buttonStyle}
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
    </TouchableOpacity>
  </View>)
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    ...theme.buttonStyle
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    paddingEnd: 10
  },
  heartImageStyle: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
  }
});