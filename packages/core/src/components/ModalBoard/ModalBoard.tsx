import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { useAsyncState } from '../../utils/context/async-state.context';
import CloseIcon from '../svg/xmark-solid.svg';

type ModalBoardProps = PropsWithChildren<{
  onClose?: () => void;
  disableOnLoading?: boolean;
}>;

export const ModalBoard = ({
  children,
  onClose,
  disableOnLoading = true,
}: ModalBoardProps) => {
  const { isLoading } = useAsyncState();

  return (
    <div
      className={classNames(
        'flex-1 bg-white rounded-sm m-12 shadow-lg relative',
        {
          'pointer-events-none': disableOnLoading && isLoading,
        }
      )}
    >
      {!!onClose && (
        <CloseIcon
          // @ts-ignore
          onClick={onClose}
          className="absolute right-8 top-5 cursor-pointer"
          width={25}
        />
      )}
      {children}
    </div>
  );
};
