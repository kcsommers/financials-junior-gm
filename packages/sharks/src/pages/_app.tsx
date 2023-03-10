import { AuthProvider } from '@statrookie/core/src/auth/context/auth-context';
import { IceBackground } from '@statrookie/core/src/components/IceBackground';
import { Modal } from '@statrookie/core/src/components/Modal';
import CookieIcon from '@statrookie/core/src/components/svg/cookie-solid.svg';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';
import FinancialsLogo from '../components/svg/financials-logo-big.svg';
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
  const [showCookiesModal, setShowCookiesModal] = useState(
    typeof navigator !== 'undefined' && !navigator.cookieEnabled
  );

  return (
    <AuthProvider baseUrl={API_BASE_URL}>
      <div
        className="relative overflow-hidden bg-white m-auto shadow-mat"
        style={{
          width: '1024px',
          height: '768px',
        }}
      >
        <IceBackground
          logo={
            <FinancialsLogo
              // @ts-ignore
              width={250}
            />
          }
        />
        <div className="relative h-full z-10">
          {getLayout(<Component {...pageProps} />)}
        </div>
        <Modal
          isVisible={showCookiesModal}
          onClose={() => setShowCookiesModal(false)}
        >
          <div className="w-full h-full flex items-center justify-center flex-col">
            {/* @ts-ignore */}
            <CookieIcon width={50} className="fill-secondary" />
            <h4 className="text-foreground text-3xl">
              This site uses cookies!
            </h4>
            <p className="text-foreground text-xl w-2/3 text-center my-8">
              Please update your browser settings to allow cookies in order to
              continue using this site.
            </p>
            <button
              className="btn btn-secondary-2"
              onClick={() => setShowCookiesModal(false)}
            >
              Ok
            </button>
          </div>
        </Modal>
      </div>
    </AuthProvider>
  );
};

// @TODO Admin total time
// @TODO check cheer points
// @TODO double header broken
// @TODO injured player shows too soon
