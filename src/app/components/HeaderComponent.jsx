import financialsLogo from '@images/financials-logo.svg';
import { StickButton } from './StickButton';
import { ObjectivesBoard } from './ObjectivesBoard';

const styles = {
  height: '125px',
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const HeaderComponent = ({
  stickBtn,
  inverse,
  largeStick,
  level,
  inTransition,
  stickBtnLink = '/home',
}) => {
  const stick = (
    <StickButton
      key='s'
      link={stickBtnLink}
      image={stickBtn}
      inverse={inverse}
      large={largeStick}
      isDisabled={inTransition}
    />
  );

  const board = (
    <ObjectivesBoard
      key='ob'
      visibleObjectives={1}
      level={level}
      smallText={true}
      filterComplete={true}
    />
  );

  const inner = inverse ? [board, stick] : [stick, board];
  return (
    <div style={styles}>
      <img src={financialsLogo} alt='Financials Junior GM Program logo' />
      <div
        className='header-inner'
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: inverse ? '0 0 0 3.8rem' : '0 3.8rem 0 0',
        }}
      >
        {inner}
      </div>
    </div>
  );
};
