import classnames from 'classnames';
import { PropsWithChildren } from 'react';
import ConfirmIcon from '../svg/check-circle-solid.svg';
import CancelIcon from '../svg/circle-xmark-solid.svg';

type ConfirmScreenProps = PropsWithChildren<{
  message?: string;
  subMessage?: string;
  cancel?: () => void;
  confirm?: () => void;
  isDisabled?: boolean;
}>;

export const ConfirmScreen = ({
  children,
  message,
  subMessage,
  isDisabled,
  cancel,
  confirm,
}: ConfirmScreenProps) => {
  return (
    <div
      className={classnames(
        'w-full h-full flex items-center max-w-[928px]',
        'justify-center flex-col text-center p-12',
        { disabled: isDisabled }
      )}
    >
      {children && <div className="w-full flex-1 mb-8">{children}</div>}
      <div className="confirm-overlay-bottom">
        <p className="text-center text-4xl font-bold mb-6 relative text-primary">
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
              <CancelIcon width={150} className="fill-red-600" />
            </button>
          </div>
          <div>
            <p>Confirm</p>
            <button className="mt-1" onClick={confirm}>
              {/** @ts-ignore */}
              <ConfirmIcon width={150} className="fill-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
