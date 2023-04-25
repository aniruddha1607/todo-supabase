import { useState } from 'react'
import { supabase } from './CreateClient'
import { Navigate, useNavigate } from 'react-router-dom'
import { authContext } from './utils/authContext';
import { useContext } from 'react';

const Login = () => {
  const authCtx = useContext(authContext);
  const navigate = useNavigate()  
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

    if (error) {
      alert(error.error_description || error.message)
    } else {
        console.log(data.user)
        authCtx.authenticate()
        navigate('/home', {
          state: {
            userId: data.user.id,
          }
        })
    }
    setLoading(false)
    
  }

  function goToSignup() {
    navigate('/')
  }

  return (
    
    <div className=" flex-col flex-center items-center h-screen bg-[#1e2124]">
      <div className="col-6 form-widget flex flex-col items-center">
        <h1 className="header py-3 font-bold text-[24px] text-[#7289da]">Login </h1>
        <p className="description py-3 pb-8 text-[#7289da]">login to use the application</p>
        <form className="form-widget bg-[#424549] p-14" onSubmit={handleLogin}>
          <div className='pb-5'>
            <input
              className="inputField rounded-md px-4 "
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="inputField rounded-md px-4"
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-y-4 items-center'>
            <button className={'button block bg-[#7289da] text-[#1e2124]'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Login</span>}
            </button>
            <button onClick={goToSignup} className='bg-[#7289da] text-[#1e2124]'> Sign up Instead</button>
          </div> 
        </form>
      </div>
    </div>
    
  )
}

export default Login