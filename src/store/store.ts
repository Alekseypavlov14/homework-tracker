import { configureStore } from '@reduxjs/toolkit'
import { coursesReducer } from '../features/courses/slice/courses.slice'
import { colorsReducer } from '../features/colors/slice/colors.slice'

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    colors: colorsReducer
  }
})

export type AppState = ReturnType<typeof store.getState>