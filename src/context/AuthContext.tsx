import { createContext } from 'react';

interface AuthContextType {
  user?: { loggedIn: boolean; [key: string]: unknown };
  dispatchUser?: (action: { type: string; payload?: unknown }) => void;
}

export const AuthContext = createContext<AuthContextType>({});
