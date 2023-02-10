import classnames from 'classnames';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import styles from './Button.module.scss';

const getFontSize = (
  str: string,
  btnSize: 'large' | 'medium' | 'small'
): string => {
  if (str && str.length > 18) {
    return btnSize === 'large' ? '1.5rem' : '1.25rem';
  }

  return btnSize === 'large' ? '2rem' : '1.5rem';
};

type ButtonProps = PropsWithChildren<{
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  size?: 'large' | 'medium' | 'small';
  href?: string;
  bgColorClass?: string;
}>;

export const Button = ({
  text,
  bgColorClass = 'bg-secondary',
  onClick,
  isLoading,
  isDisabled = false,
  size = 'large',
  children,
  href,
}: ButtonProps) => {
  return !href ? (
    <div
      className={classnames(
        styles.btn,
        bgColorClass,
        'shadow-mat text-white',
        styles[`btn_${size}`],
        {
          disabled: isDisabled,
        }
      )}
      style={{
        fontSize: getFontSize(text, size),
      }}
      onClick={onClick}
    >
      <div className={styles.btn_inner}>
        {isLoading ? (
          <LoadingSpinner size="small" />
        ) : (
          <>
            {children}
            <span className="outline-black">{text}</span>
          </>
        )}
      </div>
    </div>
  ) : (
    <Link
      href={href}
      className={classnames(
        styles.btn,
        bgColorClass,
        'shadow-mat text-white',
        styles[`btn_${size}`],
        {
          disabled: isDisabled,
        }
      )}
      style={{
        fontSize: getFontSize(text, size),
      }}
      onClick={onClick}
    >
      <div className={styles.btn_inner}>
        {isLoading ? (
          <LoadingSpinner size="small" />
        ) : (
          <>
            {children}
            <span className="outline-black ml-2">{text}</span>
          </>
        )}
      </div>
    </Link>
  );
};
