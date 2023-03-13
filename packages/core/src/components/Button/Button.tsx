import classNames from 'classnames';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import styles from './Button.module.scss';

const getFontSize = (str: string, btnSize: 'sm' | 'md' | 'lg'): string => {
  if (str && str.length > 18) {
    return btnSize === 'lg' ? '1.5rem' : '1.25rem';
  }

  return btnSize === 'lg' ? '2rem' : '1.5rem';
};

type ButtonProps = PropsWithChildren<{
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  bgColorClass?: string;
}>;

export const Button = ({
  text,
  bgColorClass = 'bg-secondary',
  onClick,
  isLoading,
  isDisabled = false,
  size = 'lg',
  children,
  href,
}: ButtonProps) => {
  const buttonInner = (
    <>
      <div className="h-full text-white flex items-center justify-center relative z-10">
        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            {children}
            <span className="outline-black ml-2">{text}</span>
          </>
        )}
      </div>
      <span
        className={classNames(
          'absolute bottom-0 left-0 w-full h-full',
          `${size === 'sm' ? 'rounded-md' : 'rounded-xl'}`,
          'origin-top-left -skew-x-12 z-0',
          bgColorClass
        )}
      ></span>
      <span
        className={classNames(
          'absolute bottom-0 left-0 w-full h-full',
          'origin-top-right skew-x-12 z-0',
          `${size === 'sm' ? 'rounded-md' : 'rounded-xl'}`,
          bgColorClass
        )}
      ></span>
    </>
  );

  return !href ? (
    <button
      className={classNames(
        styles.btn,
        styles[size],
        bgColorClass,
        'text-white relative text-3xl',
        `after:bg-inherit before:bg-inherit`,
        `${size === 'sm' ? 'rounded-md' : 'rounded-xl'}`,
        { disabled: isDisabled }
      )}
      style={{
        fontSize: getFontSize(text, size),
      }}
      onClick={onClick}
    >
      {buttonInner}
    </button>
  ) : (
    <Link
      href={href}
      className={classNames(
        styles.btn,
        styles[size],
        bgColorClass,
        'shadow-mat text-white relative text-3xl',
        `${size === 'sm' ? 'rounded-md' : 'rounded-xl'}`,
        { disabled: isDisabled }
      )}
      style={{
        fontSize: getFontSize(text, size),
      }}
      onClick={onClick}
    >
      {buttonInner}
    </Link>
  );
};
