import { supabase } from '../CreateClient'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SmoothieCard = ({ smoothie, onDelete }) => {

  const navigate = useNavigate();
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('smoothies')
      .delete()
      .eq('id', smoothie.id)
    
    if (error) {
      console.log(error)
    }
    else {
      console.log('first')
      window.location.reload(true)
    }
    if (data) {
      console.log(data)
      onDelete(smoothie.id)
      
      
    }
  }

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p className='pb-4'>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons ">
        {/* <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link> */}
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default SmoothieCard
