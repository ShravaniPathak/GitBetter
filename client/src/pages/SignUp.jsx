import { useState } from 'react';
import { SignUpApi } from "../api/authApi.js"; 
import '../css/Auth.css'; 
import { useNavigate } from 'react-router';

function SignUp() {
  const navigate=useNavigate()
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail]=useState("");

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    
    if (!username || !password || !email) {
      setMessage("Error: Please enter email, username and password.");
      return;
    }

    const res = await SignUpApi(email, username, password);
    setMessage(res);
  };

  // Helper function to dynamically set the message class
  const getMessageClass = async (msg) => {
    if (!msg) return '';
    const lowerMsg = msg.toLowerCase();
    
    // Check for common success keywords
    if (lowerMsg.includes("success") || lowerMsg.includes("created")) {
      return 'message-display message-success';
    } 

    if (lowerMsg.includes("exists"))
    {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      navigate('/login')
    }
    // All other messages are treated as errors/warnings
    return 'message-display message-error';
  };

  return (
    // Use className instead of style
    <div className="page-container">
      <div className="signup-card">
        <h2 className="title">👋 Create Your Account</h2>

        {/* Email Input Group */}
        <div className="input-group">
          <label htmlFor="email" className="label">Email</label>
          <input 
            id="email"
            type="text" 
            placeholder='Enter your email id' 
            required 
            onChange={e => setEmail(e.target.value)} 
            className="input"
          />
        </div>

        
        {/* Username Input Group */}
        <div className="input-group">
          <label htmlFor="username" className="label">Username</label>
          <input 
            id="username"
            type="text" 
            placeholder='Enter a unique username' 
            required 
            onChange={e => setUsername(e.target.value)} 
            className="input"
          />
        </div>
        
        {/* Password Input Group */}
        <div className="input-group">
          <label htmlFor="password" className="label">Password</label>
          <input 
            id="password"
            type="password" 
            placeholder='Enter a strong password' 
            required 
            onChange={e => setPassword(e.target.value)} 
            className="input"
          />
        </div>
        
        {/* Sign Up Button */}
        <button 
          type="submit" 
          onClick={handleSignUp} 
          className="signup-button"
        >
          Sign Up
        </button>
        
        {/* Message Display - use the dynamic class */}
        <div className={getMessageClass(message)}>
          {message}
        </div>
        
      </div>
    </div>
  );
}

export default SignUp;