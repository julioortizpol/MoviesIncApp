import { Movie, Movies } from "./Models/Movie";

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
