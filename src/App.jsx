
import { Navigate, Route, Routes } from 'react-router-dom'

import './App.css'

import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Home from './pages/Home '
import Footer from './components/Footer'

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/projects' element={<Projects/> } />
    <Route path='/login' element={<Auth/>} />
    <Route path='/register' element={<Auth insideRegister={true}/>} />
   </Routes>
   <Footer/>
    </>
  )
}

export default App
