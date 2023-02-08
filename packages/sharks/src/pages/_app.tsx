import '@fortawesome/fontawesome-svg-core/styles.css';
import { AuthProvider } from '@statrookie/core/src/auth/context/auth-context';
import { IceBackground } from '@statrookie/core/src/components/IceBackground';
import { API_BASE_URL } from '../constants/api-base-url';
import '../styles/globals.scss';

export default ({ Component }) => {
  return (
    <AuthProvider baseUrl={API_BASE_URL}>
      <div
        className="relative overflow-hidden bg-white m-auto"
        style={{
          width: '1024px',
          height: '768px',
          boxShadow:
            '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        }}
      >
        <IceBackground />
        <Component />
      </div>
    </AuthProvider>
  );
};
