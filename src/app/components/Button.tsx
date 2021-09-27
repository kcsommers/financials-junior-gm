import { LoadingSpinner } from '@components';
import '@css/components/Button.css';

const getFontSize = (str, btnSize) => {
  if (str && str.length > 18) {
    return btnSize === 'large' ? '1.5rem' : '1.25rem';
  }

  return btnSize === 'large' ? '2rem' : '1.5rem';
};

export const Button = ({
  text,
  background = '#ea7200',
  color = '#fff',
  onClick,
  isLoading,
  isDisabled = false,
  size = 'large',
  image,
}: any) => {
  const inner = image ? (
    <>
      <img className="btn-img" src={image} alt={text} />
      <span className="outline-black">{text}</span>
    </>
  ) : (
    <span className="outline-black">{text}</span>
  );

  return (
    <div
      className={`box-shadow btn-${size} btn${isDisabled ? ' disabled' : ''}`}
      style={{
        backgroundColor: background,
        color: color,
        fontSize: getFontSize(text, size),
      }}
      onClick={onClick}
    >
      <div className="btn-inner">
        {!isLoading ? inner : <LoadingSpinner size="small" />}
      </div>
    </div>
  );
};
