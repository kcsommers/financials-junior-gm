import classnames from 'classnames';
import { LoadingSpinner } from '../LoadingSpinner';
import styles from './Button.module.scss';

const getFontSize = (str, btnSize) => {
  if (str && str.length > 18) {
    return btnSize === 'large' ? '1.5rem' : '1.25rem';
  }

  return btnSize === 'large' ? '2rem' : '1.5rem';
};

type ButtonProps = {
  text: string;
  onClick: (e: React.MouseEvent) => void;
  background?: string;
  color?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  size?: 'large' | 'medium' | 'small';
  image?: string;
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
}: ButtonProps) => {
  const inner = image ? (
    <>
      <img className={styles.btn_img} src={image} alt={text} />
      <span className="outline-black">{text}</span>
    </>
  ) : (
    <span className="outline-black">{text}</span>
  );

  return (
    <div
      className={classnames(styles.btn, 'box-shadow', styles[`btn_${size}`], {
        disabled: isDisabled,
      })}
      style={{
        backgroundColor: background,
        color: color,
        fontSize: getFontSize(text, size),
      }}
      onClick={onClick}
    >
      <div className={styles.btn_inner}>
        {!isLoading ? inner : <LoadingSpinner size="small" />}
      </div>
    </div>
  );
};
