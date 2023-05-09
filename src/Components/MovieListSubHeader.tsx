import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../theme';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type SubHeaderProps = {
    nowPlayingTabAction: Function,
    favMoviesTapAction: Function
}

const notFavAlert = () =>
Alert.alert('Favoritos', 'No tienes peliculas en favoritos', [
  {text: 'OK', onPress: () => {}},
]);

const getSelectedTapStyle = (currentTap: string, selectedTap: string) => {
    return selectedTap === currentTap ? {opacity: 1}:{opacity: 0.4}
}

export const MovieListSubHeader: React.FC<SubHeaderProps> = ({nowPlayingTabAction, favMoviesTapAction}: SubHeaderProps) => {
    const [selectedTap, setSelectedTap] = useState('nowPlaying')    
    const favMovies = useSelector((state: RootState) => state.favMovies.favMovies)
    
    useEffect(() => {
        if(favMovies.length < 1) setSelectedTap('nowPlaying')
      }, [favMovies]);


    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    if(selectedTap !== 'nowPlaying'){
                        setSelectedTap('nowPlaying')
                        nowPlayingTabAction()
                    }
                }}>
                <Text style={{...styles.text, ...(getSelectedTapStyle('nowPlaying', selectedTap))}}>
                    Cartelera
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    if(selectedTap !== 'favMovies'){
                        if(favMovies.length>0){
                            setSelectedTap('favMovies')
                            favMoviesTapAction()
                        }else {
                            notFavAlert()
                        }
                    }else{
                    }
                }}>
                <Text style={{ ...styles.text, ...(getSelectedTapStyle('favMovies', selectedTap)) }}>
                    Favoritas
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'row', 
        alignContent: 'flex-start',
        backgroundColor: theme.darkMoon
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingStart: 15,
    },
});