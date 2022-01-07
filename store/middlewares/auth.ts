import { Middleware } from '@reduxjs/toolkit';

const STORED_USER_KEY = 'd-t-user';

const authMiddleware: Middleware = () => (next) => (action) => {
  switch (action.type) {
    case 'user/logIn':
      localStorage.setItem(STORED_USER_KEY, JSON.stringify(action.payload));
      break;
    case 'user/logOut':
      localStorage.removeItem(STORED_USER_KEY);
      break;
    case 'user/getStoredUser':
      try {
        action.payload = JSON.parse(localStorage.getItem(STORED_USER_KEY) || '');
      } catch (e) {
        console.error(e);
      }
      break;
    default:
      break;
  }

  return next(action);
};

export default authMiddleware;
