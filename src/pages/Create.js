import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { supabase } from "../CreateClient"

const Create = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const user_id = location.state.userId;

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
   
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('smoothies')
      .insert({
        title: title,
        method: method,
        rating: rating,
        user_id: user_id
      })

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    else {

      navigate('/home', {
        state: {
          userId: user_id,
        }
      })
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/home', {
        state: {
          userId: user_id,
        }
      })
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Todo:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Work:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Priority:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Add todo item</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create