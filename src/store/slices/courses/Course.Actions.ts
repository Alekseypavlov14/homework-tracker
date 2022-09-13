export namespace Course {
  export interface Create {
    name: string
    zoomLink: string
    colorId: number
  }
  export interface Delete {
    id: number
  }
}