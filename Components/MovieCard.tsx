
import { StyleSheet, View, Text, Image } from 'react-native';
import { Movie } from '../Models/Movie';
import { theme } from '../theme';
import format from 'date-fns/format';
import { es } from 'date-fns/locale'


const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'


export const MovieCard: React.FC<Movie>  = ({title, release_date, vote_average, poster_path}: Movie) => {
    const releaseDate = format(new Date(release_date), "dd MMM, yyyy 'at' h:mmaaa", { locale: es });
    return (
    <View style={styles.movieCard}>
        <Image source={{ uri: `${IMAGE_BASE_URL}${poster_path}` }} style={{ height: 300 }} resizeMode='contain'/>
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>Fecha de estreno: {releaseDate}</Text>
            <Text style={styles.subTitle}>Puntuacion: {vote_average}/10</Text>
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