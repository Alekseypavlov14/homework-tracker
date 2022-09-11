import { AppState } from './../../store'
import { Color } from './../../../types/Color.interface'
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  all: Color[],
  default: Color
}

const initialState: InitialState = {
  all: [],
  default: {
    value: '#000',
    id: 0
  }
}

const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {}
})

export const colorsReducer = colorsSlice.reducer
export const colorsSelector = (state: AppState) => state.colors.all
export const colorDefaultSelector = (state: AppState) => state.colors.default