import '@fortawesome/fontawesome-svg-core/styles.css';
import { IceBackground } from '@statrookie/core/src/components/IceBackground';
import '../styles/globals.scss';

export default ({ Component }) => {
  return (
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
  );
};
