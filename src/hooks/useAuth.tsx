import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// eslint-disable-next-line prettier/prettier
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
