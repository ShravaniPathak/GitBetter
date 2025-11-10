import { useState } from 'react';
import { SignUpApi } from "../api/authApi.js"; 
import '../css/Auth.css'; 

function SignUp() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    
    if (!username || !password) {
      setMessage("Error: Please enter both username and password.");
      return;
    }

    const res = await SignUpApi(username, password);
    setMessage(res);
  };

  // Helper function to dynamically set the message class
  const getMessageClass = (msg) => {
    if (!msg) return '';
    const lowerMsg = msg.toLowerCase();
    
    // Check for common success keywords
    if (lowerMsg.includes("success") || lowerMsg.includes("created")) {
      return 'message-display message-success';
    } 
    // All other messages are treated as errors/warnings
    return 'message-display message-error';
  };

  return (
    // Use className instead of style
    <div className="page-container">
      <div className="signup-card">
        <h2 className="title">👋 Create Your Account</h2>
        
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