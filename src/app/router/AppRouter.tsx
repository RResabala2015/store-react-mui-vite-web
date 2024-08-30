import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from '../../sign/SignIn';
import ProtectedRoutes from './ProtectedRoutes';
import Recovery from '../../sign/Recovery';
import Dashboard from '../../home/Dashboard';

export function AppRouter(){
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<SignIn />} path='*'/>
            <Route element={<SignIn />} path='/login'/>
            <Route element={<Recovery />} path='/recovery'/>
            <Route element={<ProtectedRoutes/>}>
               <Route element={<Dashboard />} path='/dashboard'/> 
            </Route>
         </Routes>
    </BrowserRouter>
   );
}