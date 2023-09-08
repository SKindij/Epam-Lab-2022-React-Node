// AuthContext.tsx
import { createContext } from 'react';

type AuthContextType = {
  token: string | null;
  username: string | null;
  login: (jwtToken:string, user:string) => void;
  logout: () => void;
  isAuthenticated:boolean;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  username: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});
