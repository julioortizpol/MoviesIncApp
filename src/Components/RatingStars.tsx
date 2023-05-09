import { useState, useCallback } from 'react';
import { rateMovie } from '../services/MovieDb';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useErrors } from '../hooks';
import { CustomRatingBar } from './StarBar';
import { theme } from '../theme';


const ratedAlert = () =>
Alert.alert('Calificada', 'Pelicula calificada', [
  {text: 'OK', onPress: () => {}},
]);

const maxRating = [1, 2, 3, 4, 5, 6,7,8,9,10]

const RatingStars: React.FC<{movieId: number}> = ({movieId}) => {

  const [defaultRating, setDefaultRating] = useState(0);
  const setErrors = useErrors();

  const handleRateMovie = useCallback(async (item: number) => {
    rateMovie(movieId, item).then((rateObject) => {
      if(rateObject.success) ratedAlert()
    })
      .catch((err) => {
        if (err instanceof Error) {
          setErrors(err.message);
        } else {
          setErrors('No se pudo calificar la pelicula');
        }
      });
  }, []);


//
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.textStyleSmall}>
          Califica la pelicula
        </Text>
        <CustomRatingBar action={(item: number) => {
          setDefaultRating(item)
          handleRateMovie(item)
        }} defaultRating={defaultRating}/>
        <Text style={styles.textStyle}>
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom:10,
  },
  textStyle: {
    paddingTop: 8,
    paddingBottom: 8,
    color:'white',
    textAlign: 'center',
    fontSize: 23,
  },
  textStyleSmall: {
    paddingTop: 10,
    color:'white',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    ...theme.buttonStyle
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});