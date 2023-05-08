import { GuestSession, Movies } from "./types/MovieDB";
import { es } from 'date-fns/locale'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import AsyncStorage from '@react-native-async-storage/async-storage';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const storageKey = 'MovieDBGuestSession';


export const sortMoviesByTitle = (movies: Movies): Movies  => {
  const newMovies = [...movies]
  newMovies.sort(function(movieA, movieB) {
    const nameAUpper = movieA.title.toUpperCase();
    const nameBUpper = movieB.title.toUpperCase();
      
    if (nameAUpper < nameBUpper) {
      return -1;
    }
    if (nameAUpper > nameBUpper) {
      return 1;
    }
  
    // names must be equal
    return 0;
  })
  return newMovies
}

export const formatDate = (date: string): string => {
  return (date) ? format(parseISO(date), "dd MMM, yyyy", { locale: es }):'';
}

export const getImageURL = (path: string): string => {
  return `${IMAGE_BASE_URL}${path}`
}

export const isSessionIdActive = (session: GuestSession): boolean => {
  let [date] = session.expireDate.split(' ')
  let sessionDate = parseISO(date).getTime()
  let dateNow = (new Date()).getTime()
  if (dateNow < sessionDate) {
    return true
  }
  return false
}

export const getLocalGuestSession = async (): Promise<GuestSession | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

export const setGuestSession = async (sessionData: GuestSession) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(sessionData));
  } catch {}
};
