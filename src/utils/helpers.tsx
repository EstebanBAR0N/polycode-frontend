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
