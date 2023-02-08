import '@fortawesome/fontawesome-svg-core/styles.css';
import { AuthProvider } from '@statrookie/core/src/auth/context/auth-context';
import { IceBackground } from '@statrookie/core/src/components/IceBackground';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { API_BASE_URL } from '../constants/api-base-url';
import '../styles/globals.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the custom layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider baseUrl={API_BASE_URL}>
      <div
        className="relative overflow-hidden bg-white m-auto shadow-mat"
        style={{
          width: '1024px',
          height: '768px',
        }}
      >
        <IceBackground />
        <div className="relative h-full">
          {getLayout(<Component {...pageProps} />)}
        </div>
      </div>
    </AuthProvider>
  );
};
