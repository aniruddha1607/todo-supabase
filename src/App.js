import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './CreateClient'
import Auth from './Auth'
import Account from './Account'
import { BrowserRouter as Router, Link, NavLink, Route, Routes, RouterProvider, Navigate } from "react-router-dom";
import Welcome from './Welcome'
import Login from './Login'
import RequireAuth from './utils/RequireAuth'
import AuthContextProvider from './utils/authContext'
import Home from './pages/Home'
import Create from './pages/Create'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log(session && session.user.id)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <AuthContextProvider>
    <Router>
    <div className="container" style={{ padding: '50px 0 100px 0' }} >
      {/* <h1 className='text-[#7289da] text-center text-[40px] font-extrabold pb-5 mb-5 border-b-2 border-spacing-3 border-[#7289da] flex flex-col items-center'> TO DO LIST </h1> */}
      <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={!session ? <Login /> : <Account />} />
      <Route path="/home" element={!session ? <Login /> : <Home />} />
      <Route path="/create" element={!session ? <Login /> : <Create />} />
      </Routes>
    </div>
    </Router>
    </AuthContextProvider>
  )
}

export default App
