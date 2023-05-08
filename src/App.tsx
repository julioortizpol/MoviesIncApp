import { StyleSheet } from 'react-native';
import { theme } from './theme';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/Navegation';
import MoviesScreen from './screens/Movies.screen'
import MoviesDetails from './screens/MovieDetails.screen'
import ErrorBoundary from './Components/ErrorBoundary'
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
        <ErrorBoundary >
        <RootStack.Navigator>
      <RootStack.Screen name="MoviesScreen" component={MoviesScreen} 
      options={{
        title: 'Movies',
        headerStyle: {
          backgroundColor: theme.darkMoon,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
        <RootStack.Screen name="MoviesDetails"
          component={MoviesDetails}
          options={{
            title: 'Movie Details',
            headerStyle: {
              backgroundColor: theme.darkMoon,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />
    </RootStack.Navigator>
        </ErrorBoundary>
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