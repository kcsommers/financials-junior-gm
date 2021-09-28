import { OverlayBoard, Button } from '@components';
import { toggleOverlay, useAppDispatch } from '@redux';

export const BadScoutOverlay = ({
  message1,
  message2,
  buttonText,
  onButtonClick,
}: any) => {
  const dispatch = useAppDispatch();

  const closeOverlay = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    dispatch(
      toggleOverlay({
        isOpen: false,
        template: null,
      })
    );
  };

  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '6rem 0 3rem 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3
            className="color-primary"
            style={{ marginBottom: '2rem', fontSize: '2.15rem' }}
          >
            {message1}
          </h3>
          <p
            className="color-primary"
            style={{ fontSize: '1.75rem', lineHeight: '3rem' }}
          >
            {message2}
          </p>
        </div>
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Button text={buttonText} onClick={closeOverlay} />
        </div>
      </div>
    </OverlayBoard>
  );
};
