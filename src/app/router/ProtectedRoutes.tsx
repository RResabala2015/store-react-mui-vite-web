import { useContext } from 'react';
import {Outlet, Navigate, Route} from 'react-router-dom';
import { AuthContext } from '../views/store/contexts/AuthContext';

interface Context {
    dispatchUser?:any,
    user?:User
 }
 
 interface User{
    loggedIn:boolean
 }

const useAuth = () =>{
    const { user }: Context = useContext(AuthContext);
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutes
