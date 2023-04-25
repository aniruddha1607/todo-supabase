import { useState } from 'react'
import { supabase } from './CreateClient'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Auth() {
  const navigate = useNavigate()  
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

    if (error) {
      alert(error.error_description || error.message)
    } else {
        navigate('/home', {
          state: {
            userId: data.user.id,
          }
        })
    }
    setLoading(false)
    
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
  }

  function goToLogin() {
    navigate('/login')
  }

  return (
    <div className="row flex-col flex-center items-center">
      <div className="col-6 form-widget flex flex-col items-center">
        <h1 className="header py-3 font-bold text-[24px]">SignIn</h1>
        <p className="description py-3">Sign in to use our app</p>
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
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-y-4 items-center'>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Sign Up</span>}
            </button>
            <button onClick={handleSignOut} > Sign out</button>
            <button onClick={goToLogin}> Log in Instead</button>
          </div>
        </form>
        
        
      </div>
    </div>
  )
}