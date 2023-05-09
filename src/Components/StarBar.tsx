import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';


const maxRating = [1,2,3,4,5,6,7,8,9,10]

type BarStyarsProps = {
    action: Function,
    defaultRating: number,
    litleStar?: boolean
}

export const CustomRatingBar: React.FC<BarStyarsProps> = ({action, defaultRating, litleStar}: BarStyarsProps ) => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => action(item)}>
              <Image
                style={(litleStar) ? styles.lilteStarImageStyle:styles.starImageStyle}
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

  const styles = StyleSheet.create({
    customRatingBarStyle: {
      paddingTop: 8,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    lilteStarImageStyle: {
      width: 16,
      height: 16,
      resizeMode: 'cover',
    },
    starImageStyle:{
        width: 25,
      height: 25,
      resizeMode: 'cover',
    }
  });