import { AppState } from '../../store'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Course } from "../../../types/Course.interface"

interface TaskCreateTemplate {
  name: string
  deadline: number
  isRequired: boolean,
  courseId: number
}

interface TaskToggleTemplate {
  courseId: number
  id: number
}

function saveToLocalStorage(state: Course[]) {
  localStorage.setItem('courses', JSON.stringify(state))
}

const savedCourses: Course[] = JSON.parse(localStorage.getItem('courses') || '[]')

const initialState: Course[] = savedCourses

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    createTask(state, action: PayloadAction<TaskCreateTemplate>) {
      const newTaskTemplate = action.payload
      const course = state.find(course => course.id === newTaskTemplate.courseId)

      course?.tasks.push({
        name: newTaskTemplate.name,
        deadline: newTaskTemplate.deadline,
        isRequired: newTaskTemplate.isRequired,
        courseId: newTaskTemplate.courseId,
        id: course.tasks.length + 1,
        done: false,
      })

      saveToLocalStorage(state)
    },
    toggleTask(state, action: PayloadAction<TaskToggleTemplate>) {
      const {courseId, id} = action.payload

      const course = state.find(course => course.id === courseId)
      const task = course?.tasks.find(task => task.id === id)

      if (task) task.done = !task.done

      saveToLocalStorage(state)
    }
  }
})

export const coursesReducer = coursesSlice.reducer
export const { createTask, toggleTask } = coursesSlice.actions
export const coursesSelector = (state: AppState) => state.courses