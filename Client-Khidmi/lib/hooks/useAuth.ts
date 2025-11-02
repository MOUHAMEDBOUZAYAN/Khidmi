import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { login, register, logout, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: (credentials: { email: string; password: string }) => dispatch(login(credentials)),
    register: (userData: { name: string; email: string; phone: string; password: string; role?: string }) =>
      dispatch(register(userData)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  };
};

