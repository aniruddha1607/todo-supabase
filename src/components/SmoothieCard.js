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
    <div className="smoothie-card bg-[#424549]">
      <h3 className='font-extrabold'>Title: {smoothie.title}</h3>
      <p className='pb-4 font-semibold'>Work: {smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons text-red-400 ">
        {/* <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link> */}
        <button className="material-icons bg-[#282b30] p-4 rounded-full" onClick={handleDelete}>delete</button>
      </div>
    </div>
  )
}

export default SmoothieCard
