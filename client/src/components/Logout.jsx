import React from 'react'
import { LogOut } from '../api/authApi'

function Logout() { 
  return (
    <button onClick={e=>LogOut()}>Log Out</button>
  )
}

export default Logout