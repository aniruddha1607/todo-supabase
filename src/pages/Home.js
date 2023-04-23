import { supabase } from '../CreateClient'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// components
import SmoothieCard from '../components/SmoothieCard'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
  const location = useLocation();
  const user_id = location.state.userId;


  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')
  const navigate = useNavigate();

  const handleDelete = (id) => {
    
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('user_id', user_id)
        // .order(orderBy, {ascending: false})
      
      if (error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()

  }, [orderBy])

  function goToCreate() {
    navigate('/create', {
      state: {
        userId: user_id,
      }
    })
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    navigate('/')
  }


  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}
        <button onClick={goToCreate} className='button mt-5 bg-teal-500 p-2 px-5 rounded-md'>Add Item</button></p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Priority</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
            ))}
          </div>
          <div className='flex flex-col items-start'>
          <button onClick={goToCreate} className='button mt-5 bg-teal-500 p-2 px-5 rounded-md'>Add Item</button>
          <button onClick={handleSignOut} className='button mt-5 bg-teal-500 p-2 px-5 rounded-md'>Logout</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
