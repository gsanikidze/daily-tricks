import { Middleware } from '@reduxjs/toolkit';

import { hideAlert } from '../modules/layout';

let alertTimeout: NodeJS.Timeout;

const authMiddleware: Middleware = (api) => (next) => (action) => {
  switch (action.type) {
    case 'layout/displayAlert':
      if (alertTimeout) {
        clearTimeout(alertTimeout);
      }

      alertTimeout = setTimeout(() => {
        api.dispatch(hideAlert());
      }, 3000);
      break;
    default:
      break;
  }

  return next(action);
};

export default authMiddleware;
