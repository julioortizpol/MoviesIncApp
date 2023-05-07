import { StyleSheet, SafeAreaView} from 'react-native';
import { theme } from './theme';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/Navegation';
import MoviesScreen from './screens/Movies.screen'
import MoviesDetails from './screens/MovieDetails.screen'
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.darkMoon,
  },
};
const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {  

    return (
      <NavigationContainer theme={MyTheme}>
      <RootStack.Navigator>
      <RootStack.Screen name="MoviesScreen" component={MoviesScreen} />
        <RootStack.Screen name="MoviesDetails"
          component={MoviesDetails}
          //options={({ route }) => ({ title: route.params.paletteName })} 
          />
    </RootStack.Navigator>
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkMoon,
  }
});

export default App