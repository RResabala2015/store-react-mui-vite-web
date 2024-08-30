import * as React from 'react';
import { AuthContext } from './app/views/store/contexts/AuthContext';
import { AuthReducer } from './app/views/store/reducers/AuthReducer';
import { AppRouter } from './app/router/AppRouter';

const init = () => {
  let sessionUser: any = sessionStorage.getItem("user");
  let user: any;
  if(!sessionUser){
   user = sessionUser;
  }
   else{
    user = JSON.parse(sessionUser);
   }
  return user; 
}

export default function App() {

  const [user, dispatchUser ] = React.useReducer(AuthReducer, {}, init);
  
  return (
    <AuthContext.Provider value={{user, dispatchUser}}>
      <AppRouter />
    </AuthContext.Provider>  
  );
}