import styles from './LoadingSpinner.module.scss';

export const LoadingSpinner = ({ size = '' }) => {
  return (
    <div
      className={`${styles.loadingSpinner}${
        size === 'small' ? ` ${styles.loadingSpinnerSmall}` : ''
      }`}
    ></div>
  );
};
