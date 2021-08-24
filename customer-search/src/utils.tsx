export const getRequestInit = (jwt: string): RequestInit => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`,
  },
});
