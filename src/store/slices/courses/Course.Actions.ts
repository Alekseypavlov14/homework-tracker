export namespace Course {
  export interface Create {
    name: string
    zoomLink: string | null
    colorId: number
  }
  export interface Delete {
    id: number
  }
}