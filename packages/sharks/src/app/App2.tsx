import '@css/App.css';
import { faCookie, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter2 } from './AppRouter2';

const App = () => {
  const [showCookieSnackbar, setShowCookieSnackbar] = useState(
    !navigator.cookieEnabled
  );

  return (
    <div className="app-container">
      {showCookieSnackbar && (
        <div className="slide-up">
          <div className="cookie-snackbar box-shadow">
            <FontAwesomeIcon
              style={{
                position: 'absolute',
                left: '1rem',
                top: '1rem',
                cursor: 'pointer',
              }}
              icon={faTimes}
              onClick={() => {
                setShowCookieSnackbar(false);
              }}
            />
            <div className="cookie-snackbar-inner">
              <FontAwesomeIcon icon={faCookie} size="4x" />
              <h3>This site uses cookies</h3>
              <p>
                Please update your browser settings to allow cookies in order to
                continue using this site.
              </p>
              <span
                onClick={() => {
                  setShowCookieSnackbar(false);
                }}
              >
                Ok
              </span>
            </div>
          </div>
        </div>
      )}
      <BrowserRouter>
        <AppRouter2 />
      </BrowserRouter>
    </div>
  );
};
export default App;
