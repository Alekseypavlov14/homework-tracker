import { AppState } from './../../store'
import { Color } from './../../../types/Color.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: Color[] = []

const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {}
})

export const colorsReducer = colorsSlice.reducer
export const colorsSelector = (state: AppState) => state.colors