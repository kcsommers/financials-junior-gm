import { ReactSVG } from 'react-svg';
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
  objectives,
  largeStick,
  level,
  tutorialActive,
  inTransition,
}) => {
  const stick = (
    <StickButton
      key='s'
      link='/home'
      image={stickBtn}
      inverse={inverse}
      large={largeStick}
      tutorialActive={tutorialActive}
      inTransition={inTransition}
    />
  );

  const board = (
    <ObjectivesBoard
      key='ob'
      objectives={objectives}
      level={level}
      smallText={true}
    />
  );

  const inner = inverse ? [board, stick] : [stick, board];
  return (
    <div style={styles}>
      <ReactSVG src={financialsLogo} />
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
