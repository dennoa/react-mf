export const clearJwt = (): void => localStorage.removeItem('jwt');
export const setJwt = (jwt: string): void => localStorage.setItem('jwt', jwt);
export const getJwt = (): string|null => localStorage.getItem('jwt');
