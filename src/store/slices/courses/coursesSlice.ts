import { AppState } from '../../store'
import { createSlice } from "@reduxjs/toolkit"
import { Course } from "../../../types/Course.interface"

const initialState: Course[] = []

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {}
})

export const coursesReducer = coursesSlice.reducer
export const coursesSelector = (state: AppState) => state.courses