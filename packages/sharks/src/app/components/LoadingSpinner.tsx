import '@css/components/LoadingSpinner.css';

export const LoadingSpinner = ({ size = '' }) => {
  return (
    <div
      className={`loading-spinner${
        size === 'small' ? ' loading-spinner-small' : ''
      }`}
    ></div>
  );
};
