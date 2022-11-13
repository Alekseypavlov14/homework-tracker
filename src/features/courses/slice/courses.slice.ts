import { AppState } from './../../../store/store'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Course } from "../entities/course.interface"
import { Task } from './task.actions'
import { Course as CourseActions } from './course.actions' 
import { ZoomLink } from './zoomLink.actions'
import { max } from '../../../utils/max/max'

function saveToLocalStorage(state: Course[]) {
  localStorage.setItem('courses', JSON.stringify(state))
}

const savedCourses: Course[] = JSON.parse(localStorage.getItem('courses') || '[]')

const initialState: Course[] = savedCourses

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    createTask(state, action: PayloadAction<Task.Create>) {
      const newTaskTemplate = action.payload
      const course = state.find(course => course.id === newTaskTemplate.courseId)

      course?.tasks.unshift({
        name: newTaskTemplate.name,
        deadline: newTaskTemplate.deadline,
        isRequired: newTaskTemplate.isRequired,
        courseId: newTaskTemplate.courseId,
        id: course.tasks.length + 1,
        done: false,
      })

      saveToLocalStorage(state)
    },
    toggleTask(state, action: PayloadAction<Task.Toggle>) {
      const {courseId, id} = action.payload

      const course = state.find(course => course.id === courseId)
      const task = course?.tasks.find(task => task.id === id)

      if (task) task.done = !task.done

      saveToLocalStorage(state)
    },
    deleteTask(state, action: PayloadAction<Task.Delete>) {
      const { courseId, id } = action.payload

      const course = state.find(course => course.id === courseId)
      if (!course) return

      course.tasks = course.tasks.filter(task => task.id !== id)

      saveToLocalStorage(state)
    },
    createCourse(state, action: PayloadAction<CourseActions.Create>) {
      const course = action.payload

      const ids = state.map(course => course.id)

      const maxId = max(ids)

      state.unshift({
        name: course.name,
        colorId: course.colorId,
        zoomLink: course.zoomLink,
        id: maxId + 1,
        tasks: []
      })

      saveToLocalStorage(state)
    },
    deleteCourse(state, action: PayloadAction<CourseActions.Delete>) {
      const { id } = action.payload

      const course = state.find(course => course.id === id)
      if (!course) return

      state.splice(state.indexOf(course), 1)

      saveToLocalStorage(state)
    },
    updateZoomLink(state, action: PayloadAction<ZoomLink.Update>) {
      const { id, zoomLink } = action.payload

      const course = state.find(course => course.id === id)
      if (!course) return
      
      course.zoomLink = zoomLink

      saveToLocalStorage(state)
    }
  }
})

export const coursesReducer = coursesSlice.reducer
export const { 
  createTask, 
  toggleTask, 
  deleteTask, 
  createCourse,
  deleteCourse,
  updateZoomLink
} = coursesSlice.actions
export const coursesSelector = (state: AppState) => state.courses