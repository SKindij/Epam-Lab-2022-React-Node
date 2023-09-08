// useAuth.tsx
import { useCallback, useEffect, useState } from 'react';
// дозволяє визначити типи для даних авторизації
export interface AuthData {
  token: string | null;
  username: string | null;
}

export const useAuth = () => {
  // стани будуть використовуватися для зберігання інфо про авторизацію користувача
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  // визначаємо назву ключа для зберігатися інфо в localStorage
  const storageName = 'userData';
  // функція використовується для авторизації користувача
  const login = useCallback((jwtToken:string, user:string) => {
    setToken(jwtToken);
    setUsername(user);
    // зберігаємо дані у локальному сховищі
    localStorage.setItem(
      storageName,
      JSON.stringify({ username: user, token: jwtToken })
    );
  }, []);
  // функція використовується для виходу з авторизації
  const logout = useCallback(() => {
    // скидуємо значення станів
    setToken(null);
    setUsername(null);
	// видаляємо відповідний ключ зі сховища
    localStorage.removeItem(storageName);
  }, []);
  // для отримання даних користувача зі сховища при завантаженні компоненту
  useEffect(() => {
    const data:AuthData|null = JSON.parse(localStorage.getItem(storageName) || 'null');
    if (data && data.token) {
      login(data.token, data.username);
    }
  }, [login]);

  return { login, logout, token, username };
};
