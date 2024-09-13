import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Recovery from '../pages/auth/Recovery';
import Unauthorized from '../pages/auth/Unauthorized';
import Login from '../pages/auth/Login';
import Home from '../pages/Home';

const ROLES = {
  administrador: 'ADMIN',
  usuario: 'USER',
  invitado: 'GUEST',
  soporte: 'HELP_DESK',
  contable: 'ACCOUNTANT',
};

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route element={<Login />} path="*" />
        <Route element={<Login />} path="/login" />
        <Route element={<Recovery />} path="/recovery" />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path="*" />
          <Route element={<Home />} path="/home/" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
