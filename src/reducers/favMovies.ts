import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Movie, Movies } from '../types/MovieDB'

export type FavMoviesState = {
  favMovies: Movies
}

const initialState: FavMoviesState = {
    favMovies: [],
}

export const favMoviesSlice = createSlice({
  name: 'favMovies',
  initialState,
  reducers: {
    addFavMovie: (state, action: PayloadAction<Movie>) => {
      state.favMovies = [... state.favMovies, action.payload]
    },
    deleteFavMovie: (state, action: PayloadAction<Movie>) => {
      state.favMovies = state.favMovies.filter(movie => movie.id !== action.payload.id)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addFavMovie, deleteFavMovie } = favMoviesSlice.actions

export default favMoviesSlice.reducer