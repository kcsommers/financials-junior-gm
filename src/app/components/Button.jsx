import { LoadingSpinner } from '@components';
import '@css/components/Button.css';

export const Button = ({
  text,
  background = '#ea7200',
  color = '#fff',
  onClick,
  isLoading,
}) => {
  return (
    <div
      className={`box-shadow btn`}
      style={{ backgroundColor: background, color: color }}
      onClick={onClick}
    >
      <div className='btn-inner'>
        {!isLoading ? (
          <span className='outline-black'>{text}</span>
        ) : (
          <LoadingSpinner size='small' />
        )}
      </div>
    </div>
  );
};
