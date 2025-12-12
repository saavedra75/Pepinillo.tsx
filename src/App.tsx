import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import HireCrew from "./pages/HireCrew"
import Missions from "./pages/Missions"
import Navbar from "./pages/Navbar"
import './App.css'

export  default function Router(){
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navbar/>} >
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="hirecrew" element={<HireCrew />}></Route>
                <Route path="missions" element={<Missions />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}