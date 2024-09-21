import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios';
import{BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import './App.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';

toast.configure()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  async function isAuth() {
    try {
      const response = await axios.get("http://localhost:5000/auth/is-verify", {headers:{token: localStorage.token}})
      console.log(response.data)

      response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false) 
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(()=>{
    isAuth()
  },[])
  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route 
              path='/login' 
              element={!isAuthenticated ?   <Login setAuth={setAuth} />  : <Navigate to="/dashboard" />} 
            />
            <Route 
              path='/register' 
              element={!isAuthenticated ?  <Register setAuth={setAuth}/> : <Navigate to="/login" />} 
            />
            <Route
             path='/dashboard'
             element={isAuthenticated ?  <Dashboard setAuth={setAuth}/> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
