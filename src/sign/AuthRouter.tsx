import {Routes, Route, Navigate, NavLink  } from 'react-router-dom';
import SignIn from './SignIn';


export function AuthRouter(){
   return (
      <Routes>
         <Route path="/login">
            <SignIn/>
         </Route>
         <Navigate to="/login" />
      </Routes>
   );
}