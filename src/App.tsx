import React, { useReducer } from 'react';
import { AuthContext } from './context/AuthContext';
import { AppRouter } from './routes/AppRouter';
import { AuthReducer } from './reducers/AuthReducer';

function init(_arg: unknown): { loggedIn: boolean; [key: string]: unknown } {
  const sessionUser = sessionStorage.getItem('user-security');
  if (!sessionUser) {
    return { loggedIn: false };
  }
  return JSON.parse(sessionUser) as { loggedIn: boolean; [key: string]: unknown };
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
