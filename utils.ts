import { Movies } from "./Models/Movie";
import { es } from 'date-fns/locale'
import format from 'date-fns/format';


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
  const mutateDate = (typeof date === 'string') ? date.replace(/-/g, '/') : date
  return format(new Date(mutateDate), "dd MMM, yyyy", { locale: es });
}
