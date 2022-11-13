import { Route, Routes } from "react-router"
import { Home } from "./pages/Home/Home"
import { CoursePage } from "./features/courses/pages/CoursePage/CoursePage"
import { NewCourse } from "./features/courses/pages/NewCourse/NewCourse"
import { CourseSettingsPage } from "./features/courses/pages/CourseSettingsPage/CourseSettingsPage"
import { TaskList } from "./pages/TaskList/TaskList"
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage"
import './App.css'

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<TaskList />} />
        <Route path='/courses/:id' element={<CoursePage />} />
        <Route path='/courses/:id/settings' element={<CourseSettingsPage />} />
        <Route path='/courses/new' element={<NewCourse />} />
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  )
}