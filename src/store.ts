import { configureStore } from '@reduxjs/toolkit'
import favMoviesReducer from './reducers/favMovies'

export const store = configureStore({
  reducer: {
    favMovies: favMoviesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch