import classnames from 'classnames';
import { PropsWithChildren } from 'react';
import { ModalBoard } from '../ModalBoard';
import CancelIcon from '../svg/circle-xmark-solid.svg';
import ConfirmIcon from '../svg/check-circle-solid.svg';

type ConfirmModalProps = PropsWithChildren<{
  message?: string;
  subMessage?: string;
  cancel?: () => void;
  confirm?: () => void;
  isDisabled?: boolean;
}>;

export const ConfirmModal = ({
  children,
  message,
  subMessage,
  isDisabled,
  cancel,
  confirm,
}: ConfirmModalProps) => {
  return (
    <ModalBoard onClose={cancel}>
      <div
        className={classnames(
          'w-full h-full flex items-center',
          'justify-center flex-col text-center py-8',
          { disabled: isDisabled }
        )}
      >
        {children && <div className="w-full flex-1">{children}</div>}
        <div className="confirm-overlay-bottom">
          <p
            className="text-center text-4xl font-bold mb-10 relative"
            style={{ color: '#006d75' }}
          >
            {message}
          </p>
          {subMessage && (
            <p className="confirm-message text-base">{subMessage}</p>
          )}
          <div className="confirm-options scale-75 flex items-center justify-around">
            <div>
              <p>Cancel</p>
              <button className="mt-1" onClick={cancel}>
                {/** @ts-ignore */}
                <CancelIcon width={150} />
              </button>
            </div>
            <div>
              <p>Confirm</p>
              <button className="mt-1" onClick={confirm}>
                {/** @ts-ignore */}
                <ConfirmIcon width={150} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBoard>
  );
};
