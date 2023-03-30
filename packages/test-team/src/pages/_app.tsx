import { AuthProvider } from '@statrookie/core/src/auth/context/auth-context';
import { IceBackground } from '@statrookie/core/src/components/IceBackground';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import ExclamationIcon from '@statrookie/core/src/components/svg/circle-exclamation-solid.svg';
import CookieIcon from '@statrookie/core/src/components/svg/cookie-solid.svg';
import {
  AsyncStateProvider,
  useAsyncState,
} from '@statrookie/core/src/utils/context/async-state.context';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
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

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the custom layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const [showCookiesModal, setShowCookiesModal] = useState(
    typeof navigator !== 'undefined' && !navigator.cookieEnabled
  );

  const { errorMessage, setErrorMessage, isLoading, showAppSpinner } =
    useAsyncState();

  return (
    <div
      className={classNames(
        'relative overflow-hidden bg-white m-auto shadow-mat',
        { 'pointer-events-none': isLoading }
      )}
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
          <h4 className="text-foreground text-3xl">This site uses cookies!</h4>
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
      <Modal
        isVisible={!!errorMessage}
        onClose={!isLoading ? () => setErrorMessage('') : null}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <ExclamationIcon width={50} className="fill-red-700" />
          <h4 className="text-foreground text-3xl mt-4">Uh oh!</h4>
          <p className="text-foreground text-xl w-2/3 text-center my-8">
            {errorMessage}
          </p>
        </div>
      </Modal>
      {/* @ts-ignore */}
      <AnimatePresence>
        {showAppSpinner && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 right-0 bg-white bg-opacity-75 z-50"
            initial="enter"
            animate="center"
            exit="exit"
            variants={{
              enter: {
                opacity: 1,
              },
              center: {
                opacity: 1,
              },
              exit: {
                opacity: 0,
              },
            }}
          >
            <LoadingSpinner isFullPage={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProvidedApp = (props: AppPropsWithLayout) => (
  <AuthProvider baseUrl={API_BASE_URL}>
    <AsyncStateProvider>
      <App {...props} />
    </AsyncStateProvider>
  </AuthProvider>
);

export default ProvidedApp;
