import { StyleSheet } from 'react-native';
import { theme } from './theme';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from './types/Navegation';
import MoviesScreen from './screens/Movies.screen'
import MoviesDetails from './screens/MovieDetails.screen'
import ErrorBoundary from './Components/ErrorBoundary'
import RecomendedMovies from './screens/RecomendedMovies.screen';
import { store } from './store'
import { Provider } from 'react-redux'
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.darkMoon,
  },
};
const RootStack = createStackNavigator<RootStackParamList>();

const headerStyles: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.darkMoon,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const App: React.FC = () => {  

    return (
      <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <ErrorBoundary >
        <RootStack.Navigator>
      <RootStack.Screen name="MoviesScreen" component={MoviesScreen} 
      options={{
        title: 'Pelicuas',
        ...headerStyles,
      }}/>
       <RootStack.Screen name="RecomendedMovies" component={RecomendedMovies} 
      options={{
        ...headerStyles,
        title: 'Peliculas recomendadas',
      }}/>
        <RootStack.Screen name="MoviesDetails"
          component={MoviesDetails}
          options={{
            ...headerStyles,
            title: 'Detalle de pelicula',
            
          }}
          />
    </RootStack.Navigator>
        </ErrorBoundary>
      </NavigationContainer>
      </Provider>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkMoon,
  }
});

export default App