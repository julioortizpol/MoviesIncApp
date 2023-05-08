
import { StyleSheet, View, Text, Image } from 'react-native';
import { Movie } from '../types/MovieDB';
import { theme } from '../theme';
import { formatDate, getImageURL } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';


type MovieCardProps = {
  movie: Movie,
  onPress: () => void
}
export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const { title, releaseDate, voteAverage, posterPath } = movie
  return (
    <View style={styles.movieCard}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: getImageURL(posterPath) }} style={{ height: 300 }} resizeMode='contain' />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>Fecha de estreno: {((formatDate(releaseDate)))}</Text>
          <Text style={styles.subTitle}>Puntuacion: {voteAverage}/10</Text>
        </View>
      </TouchableOpacity>
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