import { useState } from 'react';
import { LogInApi } from '../api/authApi';
import '../css/Auth.css'; 
import { useNavigate } from 'react-router';

function Login() {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    // Simple validation
    if (!username || !password) {
      setMessage("Error: Please enter both username and password.");
      return;
    }

    // Call the API
    const res = await LogInApi(username, password);
    setMessage(res);

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // navigate("/dashboard");
  };

  // Helper function to dynamically set the message class (same logic as before)
  const getMessageClass = (msg) => {
    if (!msg) return '';
    const lowerMsg = msg.toLowerCase();
    
    // Assume keywords indicate success, otherwise error/warning
    if (lowerMsg.includes("success") || lowerMsg.includes("logged in")) {
      return 'message-display message-success';
    } 
    return 'message-display message-error';
  };

  return (
    // Apply the main container and card classes
    <div className="page-container">
      <div className="signup-card"> 
        <h2 className="title">👋 Welcome Back!</h2>
        
        {/* Username Input Group */}
        <div className="input-group">
          <label htmlFor="username" className="label">Username</label>
          <input 
            id="username"
            type="text" 
            placeholder='Enter your username' 
            required 
            onChange={e => setUsername(e.target.value)} 
            className="input" // Apply the input style
          />
        </div>
        
        {/* Password Input Group */}
        <div className="input-group">
          <label htmlFor="password" className="label">Password</label>
          <input 
            id="password"
            type="password" 
            placeholder='Enter your password' 
            required 
            onChange={e => setPassword(e.target.value)} 
            className="input" // Apply the input style
          />
        </div>
        
        {/* Log In Button */}
        <button 
          type="submit" 
          onClick={handleLogin} 
          className="signup-button" // Reuse the button style
        >
          Log In
        </button>
        
        {/* Message Display - use the dynamic class */}
        <div className={getMessageClass(message)}>
          {message}
        </div>
        
      </div>
    </div>
  );
}

export default Login;