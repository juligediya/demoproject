import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/userslice'
import { Link } from 'react-router-dom'


function Sidebar() {
    const dispatch=useDispatch()
 
    const logOut=()=>{
        dispatch(logout())
    }
  return (
    <div className='text-dark' style={{ backgroundColor:'#fbeee6 ',height:'100vh',width:'250px'}}>
        <ul className='list-unstyled'>
            <Link className='text-decoration-none text-dark fs-5' to='/'><li className=' p-3 text-center'>Dashboard</li></Link>
            <Link  className='text-decoration-none text-dark fs-5'to="/login"><li className=' p-3 text-center' onClick={logOut}>Logout</li></Link>
        </ul>
    </div>
  )
}

export default Sidebar