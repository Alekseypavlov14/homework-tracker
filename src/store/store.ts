import { configureStore } from '@reduxjs/toolkit'
import { coursesReducer } from './slices/courses/coursesSlice'
import { colorsReducer } from './slices/colors/colorsSlice'

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    colors: colorsReducer
  }
})

export type AppState = ReturnType<typeof store.getState>