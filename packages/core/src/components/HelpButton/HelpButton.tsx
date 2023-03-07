import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type HelpButtonProps = PropsWithChildren<{
  text: string;
  textPosition?: 'bottom' | 'left' | 'right';
  onClick: () => void;
}>;

export const HelpButton = ({
  children,
  text,
  textPosition = 'bottom',
  onClick,
}: HelpButtonProps) => {
  return (
    <button
      className={classNames('flex items-center justify-center', {
        'flex-col text-center': textPosition === 'bottom',
      })}
      onClick={onClick}
    >
      <span
        className={classNames('flex items-center justify-center', {
          'order-2': textPosition === 'left',
        })}
      >
        {children}
      </span>
      <span
        className={classNames(
          'text-primary text-sm w-16 font-extrabold leading-4',
          { '-mt-2': textPosition === 'bottom' },
          { 'order-1 text-right -mr-2': textPosition === 'left' },
          { '-ml-2': textPosition === 'right' }
        )}
      >
        {text}
      </span>
    </button>
  );
};
