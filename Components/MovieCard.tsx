
import { StyleSheet, View, Text, Image } from 'react-native';
import { Movie } from '../types/Movie';
import { theme } from '../theme';
import { formatDate } from '../utils';


const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'


export const MovieCard: React.FC<Movie>  = ({title, releaseDate, voteAverage, posterPath}: Movie) => {
    return (
    <View style={styles.movieCard}>
        <Image source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }} style={{ height: 300 }} resizeMode='contain'/>
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>Fecha de estreno: {((formatDate(releaseDate)))}</Text>
            <Text style={styles.subTitle}>Puntuacion: {voteAverage}/10</Text>
        </View>
      </View>
    )
};

  const styles = StyleSheet.create({
    movieCard: {
      backgroundColor: theme.clearDarkMoon,
      flex: 1,
      padding: 20,
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      color: 'white',
      fontSize: 18,
    },
    subTitle: {
      // color: '#4b4a65',
      color: 'white',
      fontSize: 14,
    },
  });