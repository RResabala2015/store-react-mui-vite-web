import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoutes() {
  const Auth = useAuth();
  const location = useLocation();
  const isLoggedIn = Auth?.user && Auth?.user?.loggedIn;

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;
