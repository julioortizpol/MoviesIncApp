import { Movies } from "./types/Movie";
import { es } from 'date-fns/locale'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

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

export const formatDate = (date: string): String => {
  return format(parseISO(date), "dd MMM, yyyy", { locale: es });
}
