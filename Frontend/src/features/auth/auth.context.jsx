import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()


export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchUser() {
    try {
      const data = await getMe();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

    return(
        <AuthContext.Provider value={{user,setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}