import {useState} from 'react'
import {SignUpApi} from "../api/authApi.js"

function SignUp() {
  const [message, setMessage]=useState("")
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  return (
    <> 
    <div>
      <label>Username</label>
      <input type="text" placeholder='Enter a unique username' required onChange={e=> {setUsername(e.target.value)}}></input>
      <label>Password</label>
      <input type="password" placeholder='Enter strong password' required onChange={e=> {setPassword(e.target.value)}}></input>
    </div>
    <button type="submit" onClick={async e => {
      const res=await SignUpApi(username, password);
      setMessage(res);
    }}>Sign up</button>
    <div>{message}</div>
    </>
  )
}

export default SignUp