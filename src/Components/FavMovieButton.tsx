import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../theme';


export const FavMovieButton: React.FC = () => {
    return (<View style={{ marginTop: 20, }}>
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => { }}>
            <Text style={styles.buttonTextStyle}>
                Añadir a favorita
            </Text>
            <Image
                style={styles.heartImageStyle}
                source={require('../assets/heart.png')}
            />
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    buttonStyle: {
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      padding: 10,
      backgroundColor: theme.darkMoon,
    },
    buttonTextStyle: {
      color: '#fff',
      textAlign: 'center',
      paddingEnd: 10
    },
    heartImageStyle:{
      width: 18,
    height: 18,
    resizeMode: 'cover',
  }
  });