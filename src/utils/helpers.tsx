import javaLogo from '../assets/languages_logo/java.jpg';
import jsLogo from '../assets/languages_logo/js.png';
import rustLogo from '../assets/languages_logo/rust.png';
import pythonLogo from '../assets/languages_logo/python.png';

export const getImage = (language: string) => {
  switch (language) {
    case 'javascript':
      return jsLogo;
    case 'python':
      return pythonLogo;
    case 'rust':
      return rustLogo;
    case 'java':
      return javaLogo;
    default:
      return '';
  }
};

export const isStatusCodeInError = (statusCode: number) => {
  return statusCode >= 400 && statusCode < 600;
};

export const getToken = () => {
  const localStorageData: string | null =
    window.localStorage.getItem('userData');
  let token = '';
  if (localStorageData) {
    const userData = JSON.parse(localStorageData);
    token = userData.access_token;
  }

  return token;
};

export const getUserData = () => {
  const userData: any = window.localStorage.getItem('userData');

  return JSON.parse(userData);
};
