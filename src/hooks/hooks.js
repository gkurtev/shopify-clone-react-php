import Cookies from 'js-cookie';
import { useState } from 'react';

export function useCookiesGetDelete(key = false) {
  const [cookie, setCookie] = useState(() => {
    return Cookies.get(key) ? JSON.parse(Cookies.get(key)) : false;
  });

  const deleteCookie = () => {
    Cookies.remove(key);
    setCookie(false);
  };

  return [cookie, deleteCookie];
}
