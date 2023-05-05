
import { StyleSheet, View, Text, Image } from 'react-native';
import { Movie } from '../Models/Movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'


export const MovieCard: React.FC<Movie>  = ({title, release_date, vote_average, poster_path}: Movie) => {
    return (
    <View style={styles.movieCard}>
        <Image source={{ uri: `${IMAGE_BASE_URL}${poster_path}` }} style={{ height: 300 }} resizeMode='contain'/>
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>Fecha de estreno: {release_date}</Text>
            <Text style={styles.subTitle}>Puntuacion: {vote_average}/10</Text>
        </View>
      </View>
    )
};

  const styles = StyleSheet.create({
    movieCard: {
      backgroundColor: '#171538',
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