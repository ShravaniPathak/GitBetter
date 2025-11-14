import React from 'react'
import { LogOut } from '../api/authApi'

function Logout() { 
  return (
    <div className="fixed top-4 right-2">
    <button onClick={e=>LogOut()} className="px-2! py-2! bg-gray-800! text-white! rounded-lg! shadow hover:bg-gray-800 transition text-sm!">Log Out</button>
    </div>
  )
}

export default Logout