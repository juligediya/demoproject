import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/userslice'


function Sidebar() {
    const dispatch=useDispatch()
 
    const logOut=()=>{
        dispatch(logout())
    }
  return (
    <div className='bg-primary' style={{height:'100vh',width:'250px'}}>
        <ul className='list-unstyled'>
            <a href='/dashboard'><li className='text-white p-3 text-center'>Dashoard</li></a>
            <a href='/login'><li className='text-white p-3 text-center'>Login</li></a>
            <a href="/login"><li className='text-white p-3 text-center' onClick={logOut}>Logout</li></a>
        </ul>
    </div>
  )
}

export default Sidebar