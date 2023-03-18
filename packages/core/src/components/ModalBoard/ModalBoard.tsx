import { PropsWithChildren } from 'react';
import CloseIcon from '../svg/xmark-solid.svg';

type ModalBoardProps = PropsWithChildren<{
  onClose?: () => void;
}>;

export const ModalBoard = ({ children, onClose }: ModalBoardProps) => {
  return (
    <div className="flex-1 bg-white rounded-sm m-12 shadow-lg relative">
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
