// useHttp.tsx
import { useCallback, useState } from 'react';

// оголошення типу для пропсів, які можна передавати в функцію request
interface UseHttpProps {
  url:string;
  httpMethod?:string;
  body?:any;
  // означає, що headers повинен бути об'єктом (Record), 
  // де ключі та значення повинні бути рядками
  headers?:Record<string, string>;
}
// оголошення типів для повертаємих значень з функції useHttp
interface UseHttpReturn<TData = any, TError = any> {
  loading:boolean;
  error: TError | null;
  request: (props:UseHttpProps) => Promise<TData>;
}

// функція, яка повертає об'єкт зі станами loading, error, та функцією request
export const useHttp:()=>UseHttpReturn = () => {
  // стан, що вказує, чи триває запит
  const [loading, setLoading] = useState(false);
  // стан, який містить помилки, якщо вони виникають під час запиту
  const [error, setError] = useState<any>(null);
  // функція для виконання HTTP-запитів
  const request = useCallback(
    async ({ url, httpMethod = 'GET', body, headers = {} }:UseHttpProps) => {
      // встановлює стан true, щоб позначити початок запиту
	  setLoading(true);
      // якщо передано тіло запиту, встановлюється заголовок
      if (body) {
        headers['Content-Type'] = 'application/json';
      }
      // виконується фактичний HTTP-запит за допомогою fetch
      try {
        const response = await fetch(url, {
          method: httpMethod,
          body: body && JSON.stringify(body),
          headers,
        });
        const data = await response.json();
        setError(null);

        if (!response.ok) {
          throw new Error(data.errors || 'Something went wrong');
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error);
        throw error;
      }
    },
    []
  );
  // повертає об'єкт, який можна використовувати в інших компонентах 
  // для виконання HTTP-запитів та обробки результатів
  return { loading, error, request };
};
