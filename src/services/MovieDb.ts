import { Movie, MovieResponse, Movies } from "../types/Movie";
import { MOVIES_API_BASE_URL, MOVIES_API_KEY } from "@env"
const apiLanguage = 'es'

const moviesdbToMovies = (result: MovieResponse) : Movie => (
    {
      id: result.id, 
      title: result.title, 
      releaseDate: result.release_date, 
      voteAverage: result.vote_average,
      posterPath: result.poster_path
    }
  )


export function fetchMovies(): Promise<Movies> {
    const URL = `${MOVIES_API_BASE_URL}/now_playing?api_key=${MOVIES_API_KEY}&language=${apiLanguage}S&page=1`;
    return fetch(URL)
            .then(res => res.json())
            .then(res => res.results as MovieResponse[])
            .then(res => {
                return res.map(moviesdbToMovies)
            })
}