
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Actor } from '../types/Movie';

type MovieGenresProps = {
  actor: Actor
}


export const ActorComponent: React.FC<MovieGenresProps> = ({ actor }: MovieGenresProps) => {
  return (
    <View style={{ paddingBottom: 10 }}>
      <Text style={theme.defaultText}>
        {actor.name}
      </Text>
      <Text style={theme.defaultText}>
        Personaje: {actor.character}
      </Text>
    </View>
  )
};