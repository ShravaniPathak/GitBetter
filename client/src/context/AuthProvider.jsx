import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [access_token, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refresh() {
      try {
        const refresh_token=localStorage.getItem('refresh_token');
        const response = await fetch("http://localhost:5000/auth/refresh", {
          method: "GET",
          headers: {"Content-Type":"application/json",
            "x_refresh_token": refresh_token
          }
        });

        const data=await response.json()

        if (!data.success) {
            console.log("Fetch request not a success")
            console.log("Message"+data.body.message);
        }

        setAccessToken(data.body.access_token);
      } catch {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }

    refresh();
  }, []);

  const value = {
    access_token,
    isAuthenticated: !!access_token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({children}) => {
  const navigate=useNavigate();
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) {
      navigate("/login");
    };

    return children;

}