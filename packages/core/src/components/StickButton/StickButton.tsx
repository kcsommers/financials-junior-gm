import classNames from 'classnames';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import styles from './StickButton.module.scss';

type StickButtonProps = PropsWithChildren<{
  href?: string;
  inverse?: boolean;
  size?: 'large' | 'small';
  isDisabled?: boolean;
  validateNavigation?: () => boolean;
  showBg?: boolean;
}>;

export const StickButton = ({
  children,
  href,
  inverse = false,
  size = 'large',
  isDisabled = false,
  validateNavigation,
}: StickButtonProps) => {
  return (
    <div
      className={classNames(
        'relative',
        styles.stick_btn_wrap,
        { [styles.stick_btn_small]: size === 'small' },
        { disabled: isDisabled }
      )}
    >
      <span
        className={classNames('absolute', styles.stick_btn_img, {
          [styles.stick_btn_img_inverse]: inverse,
        })}
      >
        {children}
      </span>
      <Link
        href={href}
        className={classNames('w-full h-full inline-block relative btn', {
          disabled: isDisabled,
        })}
        onClick={(e) => {
          const shouldNav = !validateNavigation || validateNavigation();
          if (!shouldNav) {
            e.preventDefault();
          }
        }}
      ></Link>
    </div>
  );
};
