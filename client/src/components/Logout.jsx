import React from 'react'
import { LogOut } from '../api/authApi'

function Logout() { 
  return (
    <button onClick={e=>LogOut()}></button>
  )
}

export default Logout