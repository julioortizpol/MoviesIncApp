
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

type MovieGenresProps = {
  genres: {id:number, name:string}[]
}


export const MovieGenres: React.FC<MovieGenresProps>  = ({genres}: MovieGenresProps) => {
    return (
      <View>
        <Text style={{ ...styles.subTitle,  }}>Generos:</Text>
        <View style={{flex:1, flexDirection:'row'}}>
      {genres.map((element, index) =>
        <Text style={theme.defaultText} key={index}>
          {element.name}
          {((genres && genres?.length - 1) === index) ? "" : ', '}
        </Text>)}
      </View>
      </View>
    )
};

const styles = StyleSheet.create({
  subTitle: {
    ...theme.subTitle,
    fontWeight: 'bold',
    textAlign: 'left',
  }
});