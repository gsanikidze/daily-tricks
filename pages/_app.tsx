import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useEffect } from 'react';

import store from '../store';
import '../styles/globals.css';
import firebaseConfig from '../constants/firebaseConfig';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
