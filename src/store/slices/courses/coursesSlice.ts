import { AppState } from '../../store'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Course } from "../../../types/Course.interface"
import { Task } from './Task.Actions'
import { Course as CourseActions } from './Course.Actions' 

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
      const task = course?.tasks.find(task => task.id === id)

      
    },
    createCourse(state, action: PayloadAction<CourseActions.Create>) {
      const course = action.payload

      state.push({
        name: course.name,
        colorId: course.colorId,
        zoomLink: course.zoomLink,
        id: state.length + 1,
        tasks: []
      })

      saveToLocalStorage(state)
    }
  }
})

export const coursesReducer = coursesSlice.reducer
export const { createTask, toggleTask, createCourse } = coursesSlice.actions
export const coursesSelector = (state: AppState) => state.courses