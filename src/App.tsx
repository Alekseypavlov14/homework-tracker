import { Route, Routes } from "react-router"
import { Home } from "./pages/Home/Home"
import { CoursePage } from "./pages/CoursePage/CoursePage"
import { NewCourse } from "./pages/NewCourse/NewCourse"
import { CourseSettings } from "./pages/CourseSettings/CourseSettings"
import { TaskList } from "./pages/TaskList/TaskList"
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage"
import './App.css'
import { InteractionManager } from "./components/InteractionManager/InteractionManager"

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<TaskList />} />
        <Route path='/courses/:id' element={<CoursePage />} />
        <Route path='/courses/:id/settings' element={<CourseSettings />} />
        <Route path='/courses/new' element={<NewCourse />} />
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
      <InteractionManager />
    </div>
  )
}