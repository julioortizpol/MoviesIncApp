import { Actor, Movie, MovieDBResponse, Movies } from "../types/Movie";
import { MOVIES_API_BASE_URL, MOVIES_API_KEY } from "@env"
const apiLanguage = 'es'

const moviesdbToMovies = (result: MovieDBResponse) : Movie => (
    {
      id: result.id, 
      title: result.title, 
      releaseDate: result.release_date, 
      voteAverage: result.vote_average,
      posterPath: result.poster_path,
    }
  )
  const creditsDBToActors = (result: any) : Actor => (
    {
      id: result.credit_id, 
      name: result.name, 
      character: result.character, 
      profilePath: result.profilePath,
    }
  )
  const moviesdbToMovieDetails = (result: MovieDBResponse) : Movie => (
    {
      id: result.id, 
      title: result.title, 
      releaseDate: result.release_date, 
      voteAverage: result.vote_average,
      posterPath: result.poster_path,
      overview: result.overview,
      genres: result.genres,
      actors: result?.credits?.cast.map(creditsDBToActors)
    }
  )




export function fetchMovies(): Promise<Movies> {
    const URL = `${MOVIES_API_BASE_URL}/now_playing?api_key=${MOVIES_API_KEY}&language=${apiLanguage}&page=1`;
    return fetch(URL)
            .then(res => res.json())
            .then(res => res.results as MovieDBResponse[])
            .then(res => {
                return res.map(moviesdbToMovies)
            })
}

export function fetchMovieDetails(id: Number): Promise<Movie> {
  const URL = `${MOVIES_API_BASE_URL}/${id}?api_key=${MOVIES_API_KEY}&language=${apiLanguage}&append_to_response=credits`;
  return fetch(URL)
          .then(res => res.json())
          .then(res => res as MovieDBResponse)
          .then(res => {
              return moviesdbToMovieDetails(res)
          })
}