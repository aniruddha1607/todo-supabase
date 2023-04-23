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
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Login </h1>
        <p className="description">login to use the application</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="inputField"
              type="text"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-y-4 items-center'>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Login</span>}
            </button>
            <button onClick={goToSignup}> Sign up </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login