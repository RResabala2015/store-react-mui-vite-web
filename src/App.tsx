import React, { useReducer } from 'react';
import { AuthContext } from './context/AuthContext';
import { AppRouter } from './routes/AppRouter';
import { AuthReducer } from './reducers/AuthReducer';

function init(arg: any) {
  const sessionUser: any = sessionStorage.getItem('user-security');
  let user: unknown;
  if (!sessionUser) {
    user = sessionUser;
  } else {
    user = JSON.parse(sessionUser);
  }

  sessionStorage.clear();

  return user;
}

export default function App() {
  const [user, dispatchUser] = useReducer(AuthReducer, {}, init);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, dispatchUser }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}
