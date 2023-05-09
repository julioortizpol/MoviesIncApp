
import { StyleSheet, View, Text, Image } from 'react-native';
import { Movie } from '../types/MovieDB';
import { theme } from '../theme';
import { formatDate, getImageURL } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomRatingBar } from './StarBar';


type MovieCardProps = {
  movie: Movie,
  onPress?: () => void
}
export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress}) => {
  const { title, releaseDate, voteAverage, posterPath } = movie
  return (
    <TouchableOpacity onPress={onPress} disabled={(onPress) ? false:true}>
    <View style={styles.movieCard}>
        <Image source={{ uri: getImageURL(posterPath) }} style={{ width:180, height:300 }}  />
        <View style={styles.movieDetailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>Fecha de estreno: </Text>
          <Text style={styles.subTitle}>{((formatDate(releaseDate)))}</Text>
          <Text style={styles.scoreText}>{voteAverage}</Text>
          <CustomRatingBar action={() => {}} defaultRating={voteAverage} litleStar/>
        </View>
    </View>
    </TouchableOpacity>

  )
};

const styles = StyleSheet.create({
  movieCard: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  movieDetailsContainer: {
    backgroundColor: theme.clearDarkMoon,
    flex:1, 
    justifyContent:'flex-end', 
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 10
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 10
  },
  subTitle: {
    color: 'white',
    fontSize: 14,
  },
  scoreText: {
    paddingTop: 10,
    fontWeight: 'bold',
    paddingEnd: 4,
    color: 'yellow',
    fontSize: 18,
  },
});