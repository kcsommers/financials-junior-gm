import classNames from 'classnames';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  isFullPage?: boolean;
};

export const LoadingSpinner = ({
  size = 'md',
  isFullPage = false,
}: LoadingSpinnerProps) => {
  const spinner = (
    <div
      className={classNames(
        'inline-block animate-spin border-4 border-primary-2/30 rounded-full border-t-primary',
        {
          'w-[70px] h-[70px]': size === 'md' || size === 'lg',
          'w-[40px] h-[40px]': size === 'sm',
        }
      )}
    ></div>
  );
  return !isFullPage ? (
    spinner
  ) : (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      {spinner}
    </div>
  );
};
