export interface Interaction {
  message: string
  confirm: () => void
  cancel: () => void
}