import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Habits from './pages/Habits.jsx';
import { AuthProvider, ProtectedRoute } from './context/AuthProvider';

const router=createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/habits",
    element: 
    <ProtectedRoute>
      <Habits />
    </ProtectedRoute>
  }
]) 

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)

