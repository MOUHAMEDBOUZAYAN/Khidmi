import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { loadUser } from '../store/slices/authSlice';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Charger l'utilisateur depuis AsyncStorage au démarrage
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

