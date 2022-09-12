import { Route, Routes } from "react-router"
import { Home } from "./pages/Home/Home"
import { CoursePage } from "./pages/CoursePage/CoursePage"
import { NewCourse } from "./pages/NewCourse/NewCourse"
import './App.css'
import { CourseSettings } from "./pages/CourseSettings/CourseSettings"

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses/:id' element={<CoursePage />} />
        <Route path='/courses/:id/settings' element={<CourseSettings />} />
        <Route path='/courses/new' element={<NewCourse />} />
      </Routes>
    </div>
  )
}