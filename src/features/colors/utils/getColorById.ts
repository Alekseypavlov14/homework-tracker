import { Color } from '../types/color.interface'

export function getColorById(
  colors: Color[], 
  defaultColor: Color, 
  colorId: number
) {
  const color = colors.find(color => color.id === colorId) || defaultColor
  return color.value
}