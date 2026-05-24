import React, {
  
  
  useEffect,
  useState,
} from 'react';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from './authContext';

 
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading,setLoading]=useState(false)
  const instance = useAxios();
  const [token, setToken] = useState(localStorage.getItem('token'));
 
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }
  
  useEffect(() => {
    if (!token) {
     return
   }
      const fetchUser = async () => {
        try {
          setLoading(true)
          const res = await instance.get('/api/auth/user');
          setUser(res.data);
          
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false)
        }
  }
    fetchUser();
   
  }, [token, instance]);
  
  const userInfo = {
    user,
    loading,
    setLoading,
    token,
    setToken,
    logout
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider


