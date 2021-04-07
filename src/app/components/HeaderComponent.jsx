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
  tutorialActive,
  beforeNav,
}) => {
  const stick = (
    <StickButton
      key="s"
      link={stickBtnLink}
      stick={stickBtn}
      inverse={inverse}
      large={largeStick}
      isDisabled={inTransition || tutorialActive}
      beforeNav={beforeNav}
    />
  );

  const board = (
    <div key="ob" style={{ maxWidth: '350px' }}>
      <ObjectivesBoard
        visibleObjectives={1}
        level={level}
        smallText={true}
        filterComplete={true}
      />
    </div>
  );

  const inner = inverse ? [board, stick] : [stick, board];
  return (
    <div style={styles}>
      <img src={financialsLogo} alt="Financials Junior GM Program logo" />
      <div
        className="header-inner"
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
