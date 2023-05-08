import { useState, useCallback, useEffect } from 'react';
import { rateMovie } from '../services/MovieDb';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';


const ratedAlert = () =>
Alert.alert('Calificada', 'Pelicula calificada', [
  {text: 'OK', onPress: () => {}},
]);

const maxRating = [1, 2, 3, 4, 5, 6,7,8,9,10]

const StarRatingBar: React.FC<{movieId: number}> = ({movieId}) => {

  const [defaultRating, setDefaultRating] = useState(0);
  const [errors, setErrors] = useState<String>();
  // something to show succes message

  const handleRateMovie = useCallback(async () => {
    rateMovie(movieId, defaultRating).then((rateObject) => {
      if(rateObject.success) ratedAlert()
    })
      .catch((err) => {
        if (err instanceof Error) {
          setErrors(err.message);
        } else {
          setErrors('A ocurrido un error');
        }
      });
  }, [defaultRating]);

  const CustomRatingBar = (): JSX.Element => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? require('../assets/star_filled.png')
                    : require('../assets/star_corner.png')
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.textStyleSmall}>
          Califica la pelicula
        </Text>
        <CustomRatingBar />
        <Text style={styles.textStyle}>
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => handleRateMovie()}>
          <Text style={styles.buttonTextStyle}>
            Calificar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StarRatingBar;

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
    padding: 15,
    backgroundColor: '#2329dc',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  customRatingBarStyle: {
    paddingTop: 8,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImageStyle: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
});