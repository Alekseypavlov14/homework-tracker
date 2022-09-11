import { Route, Routes } from "react-router"
import { Home } from "./pages/Home/Home"
import './App.css'

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<div />} />
      </Routes>
    </div>
  )
}