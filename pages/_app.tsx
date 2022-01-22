import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useEffect, useState } from 'react';

import store from '../store';
import '../styles/globals.css';
import { firebaseConfig } from '../constants';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const [apps, setApps] = useState<FirebaseApp[]>([]);

  useEffect(() => {
    if (typeof window === 'object') {
      const app = initializeApp(firebaseConfig);
      getAnalytics(app);
      setApps(getApps());
    }
  }, []);

  if (apps.length === 0) {
    return null;
  }

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
