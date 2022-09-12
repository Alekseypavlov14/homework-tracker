export namespace Task {
  export interface Create {
    name: string
    deadline: number
    isRequired: boolean,
    courseId: number
  }

  export interface Toggle {
    courseId: number
    id: number
  }

  export interface Delete {
    courseId: number
    id: number
  }
}