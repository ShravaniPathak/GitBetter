import { useState } from 'react'
import { LogInApi } from '../api/authApi';

function Login() {
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [message, setMessage]=useState("");
  return (
    <>
    <div>
    <label>Username</label>
    <input required type="text" placeholder='Enter your username' onChange={e=> {setUsername(e.target.value)}}></input>
    <label>Password</label>
    <input required type="password" placeholder='Enter your password' onChange={e=> {setPassword(e.target.value)}}></input>
    </div>
    <button type="submit" onClick={async e=> {
      const res=await LogInApi(username, password)
      setMessage(res);
    }}>Log in</button>
    <div>{message}</div>
    </>
  )
}

export default Login