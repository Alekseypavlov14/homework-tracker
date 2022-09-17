export interface Interaction {
  id: number
  message: string
  confirm: () => void
  cancel: () => void
}