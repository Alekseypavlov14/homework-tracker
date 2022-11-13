import { AppState } from '../../../store/store'
import { Color } from '../types/color.interface'
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  all: Color[],
  default: Color
}

const initialState: InitialState = {
  all: [
    { value: '#005eff', id: 1 },
    { value: '#44944A', id: 2 },
    { value: '#FF2400', id: 3 },
    { value: '#8b00ff', id: 4 },
    { value: '#FFD700', id: 5 },
  ],
  default: { value: '#000', id: 0 }
}

const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {}
})

export const colorsReducer = colorsSlice.reducer
export const colorsSelector = (state: AppState) => state.colors.all
export const colorDefaultSelector = (state: AppState) => state.colors.default