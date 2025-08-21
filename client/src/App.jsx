import { useState, useContext,  } from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'

import Protected from './protectedRoutes/Protected'
import { AuthContext } from './contexts/Auth'

import Navbar from './components/Navbar'
import Recipes from './pages/Recipes'
import NewRecipe from './pages/NewRecipe'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const {user} = useContext(AuthContext)
  
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar /> 
      <Routes>
        <Route path='/' element= {<Home />}></Route>        
        <Route path='/register' element= {user ? <Navigate to='/' /> : <Register />} ></Route>         
        <Route path='/login' element= {user ? <Navigate to='/' /> : <Login />} ></Route>

        {/* PROTECTED ROUTES */}
        <Route element ={<Protected />} >
          <Route path='/Recipes' element ={<Recipes />}></Route>
          <Route path='/Recipes/newrecipe' element ={<NewRecipe />}></Route>
        </Route>
      </Routes>
      
    </div>
  )
}

export default App
