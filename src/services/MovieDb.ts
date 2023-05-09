import { Actor, GuestSession, Movie, MovieDBResponse, Movies } from "../types/MovieDB";
import { MOVIES_API_BASE_URL, MOVIES_API_KEY, AUTH_API_BASE_URL} from "@env"
import { getLocalGuestSession, isSessionIdActive, setGuestSession } from "../utils";
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
            .then(res => {
              if(res.results){
                return res.results as MovieDBResponse[]
              }else {
                throw new Error('No se pudo cargar la lista de peliculas');
              }
            })
            .then(res => {
                return res.map(moviesdbToMovies)
            })
}

export function fetchRecomendedMovies(id:number): Promise<Movies> {
  const URL = `${MOVIES_API_BASE_URL}/${id}/recommendations?api_key=${MOVIES_API_KEY}&language=${apiLanguage}&page=1`;
  return fetch(URL)
          .then(res => res.json())
          .then(res => {
            if(res.results){
              return res.results as MovieDBResponse[]
            }else {
              throw new Error('No se pudo cargar la lista de peliculas');
            }
          })
          .then(res => {
              return res.map(moviesdbToMovies)
          })
}

export function fetchMovieDetails(id: number): Promise<Movie> {
  const URL = `${MOVIES_API_BASE_URL}/${id}?api_key=${MOVIES_API_KEY}&language=${apiLanguage}&append_to_response=credits`;
  return fetch(URL)
          .then(res => res.json())
          .then(res => {
            if(res.ok || res.status){
              return res as MovieDBResponse
            }else {
              throw new Error('No se pudo cargar los detalles de la pelicula');
            }
          })
          .then(res => { 
              return moviesdbToMovieDetails(res)
          })
}

export async function rateMovie(id: number, rate: number): Promise<{success: boolean}> {
  let sessionData = await getLocalGuestSession()
  if(!(sessionData?.guestSessionId && isSessionIdActive(sessionData))) {
    sessionData = await getGuestSession()
    setGuestSession(sessionData)
  }

  const URL = `${MOVIES_API_BASE_URL}/${id}/rating?api_key=${MOVIES_API_KEY}&guest_session_id=${sessionData.guestSessionId}`;
  return fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        value: rate,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(res => res.json())
    .then(res => {
      if(res.ok || res.status || res.success){
        return {success: res.success}
      }else {
        throw new Error('No se pudo calificar la pelicula');
      }
    })
         
}

function getGuestSession(): Promise<GuestSession> {
  const URL = `${AUTH_API_BASE_URL}/guest_session/new?api_key=${MOVIES_API_KEY}`;
  return fetch(URL)
          .then(res => res.json())
          .then(res => {
            if(res.ok || res.status || res.success){
              return res
            }else {
              throw new Error('No se pudo calificar la pelicula');
            }
          })
          .then(res => {
              return {
                guestSessionId: res.guest_session_id,
                expireDate: res.expires_at
              }
          })
}