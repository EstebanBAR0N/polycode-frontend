import { useState, useEffect, useContext, createContext } from 'react';

const authContext: React.Context<any> = createContext({});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const defaultLocalStorage: any = {};
  const [localStorageState, setLocalStorageState] =
    useState(defaultLocalStorage);

  const defaultUser: any = {};
  const [user, setUser] = useState(defaultUser);

  // update localStorageState for each render
  useEffect(() => {
    const localStorageData: string | null = localStorage.getItem('userData');
    let userData: any = null;

    if (localStorageData) {
      userData = JSON.parse(localStorageData);
    }

    // check si le token est tj valide
    const expirationDate: number = userData?.expirationDate;
    const now: number = Date.now();

    if (expirationDate && now < expirationDate) {
      setLocalStorageState(userData);
    } else {
      setLocalStorageState({});
      localStorage.setItem('userData', JSON.stringify({}));
    }

    // cleanup function
    return () => {
      userData = null;
    };
  }, []);

  // Change user on localStorageState changes
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    if (!localStorageState?.userId) {
      setUser({});
    } else {
      setUser({ id: localStorageState?.userId });
    }
  }, [localStorageState]);

  // update localStorage
  const login = (userData: any) => {
    setLocalStorageState(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setLocalStorageState({});
    localStorage.setItem('userData', JSON.stringify({}));
  };

  // Return the user object and auth methods
  return {
    user,
    login,
    logout,
  };
}
