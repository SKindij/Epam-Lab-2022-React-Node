// useHttp.tsx
import { useCallback, useState } from 'react';

// оголошення типу для пропсів, які можна передавати в функцію request
interface UseHttpProps {
  url:string;
  method?:string;
  body?:any;
  // означає, що headers повинен бути об'єктом (Record), 
  // де ключі та значення повинні бути рядками
  headers?:Record<string, string>;
}
// оголошення типів для повертаємих значень з функції useHttp
interface UseHttpReturn {
  loading:boolean;
  error:any;
  request: (props:UseHttpProps) => Promise<any>;
}

// функція, яка повертає об'єкт зі станами loading, error, та функцією request
export const useHttp:()=>UseHttpReturn = () => {
  // стан, що вказує, чи триває запит
  const [loading, setLoading] = useState(false);
  // стан, який містить помилки, якщо вони виникають під час запиту
  const [error, setError] = useState<any>(null);
  // request - функція для виконання HTTP-запитів
  // useCallback використовується для забезпечення мемоізації функції, 
  const request = useCallback(
    async ({ url, method = 'GET', body, headers = {} }:UseHttpProps) => {
      // встановлює стан true, щоб позначити початок запиту
	  setLoading(true);
      // якщо передано тіло запиту, встановлюється заголовок
      if (body) {
        headers['Content-Type'] = 'application/json';
      }     
      try {
	  // виконується фактичний HTTP-запит за допомогою fetch
        const response = await fetch(url, {
          method,
          body: body && JSON.stringify(body),
          headers,
        });
		// після отримання відповіді витягуємо дані у форматі JSON 
        const data = await response.json();
        setError(null);
        // перевіряється статус відповіді (чи вона успішна)
        if (!response.ok) {
		  // помилка буде передана на зовнішній рівень
          throw new Error(data.errors || 'Something went wrong');
        }
		// щоб позначити завершення запиту
        setLoading(false);
		// дані, отримані з сервера, повертаються в request
        return data;
      } catch (error) {
        setLoading(false);
        setError(error);
        throw error;
      }
    },
	// функція request не залежить від жодних змінних, 
	// і вона буде однаковою після кожного рендеру компонента
    []
  );
  // повертає об'єкт, який можна використовувати в інших компонентах 
  // для виконання HTTP-запитів та обробки результатів
  return { loading, error, request };
};
