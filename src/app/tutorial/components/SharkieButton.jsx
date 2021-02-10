import { setTutorialState } from '@redux/actions';
import { useDispatch } from 'react-redux';
import sharkieBtn from '@images/sharkie-btn.svg';
import { ReactSVG } from 'react-svg';

const textStyles = {
  bottom: {
    bottom: 0,
    transform: 'translateY(calc(100% + 0.15rem))',
    fontSize: '0.8rem',
    display: 'inline-block',
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    texAlign: 'center',
  },
  left: {
    top: '50%',
    transform: 'translate(calc(-100% - 0.15rem), -50%)',
    fontSize: '0.8rem',
    display: 'inline-block',
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    texAlign: 'center',
  },
  right: {
    top: '50%',
    transform: 'translate(calc(100% + 0.15rem), -50%)',
    fontSize: '0.8rem',
    display: 'inline-block',
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'left',
  },
};

export const SharkieButton = ({ textPosition, tutorialSlides }) => {
  const dispatch = useDispatch();

  return (
    <button
      className='sharkie-btn'
      style={{
        outline: 'none',
        border: 'none',
        background: 'none',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '65px',
        height: '65px',
      }}
      onClick={() => {
        dispatch(setTutorialState({ isActive: true, slides: tutorialSlides }));
      }}
    >
      <ReactSVG src={sharkieBtn} style={{ marginTop: '12px' }} />
      <span
        className='color-primary'
        style={textStyles[textPosition] || textStyles['bottom']}
      >
        CALL SHARKIE
      </span>
    </button>
  );
};
