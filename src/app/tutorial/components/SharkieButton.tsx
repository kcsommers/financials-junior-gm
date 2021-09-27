import sharkieBtn from '@images/sharkie-btn.svg';

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
    textAlign: 'center',
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
    textAlign: 'right',
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

export const SharkieButton = ({ textPosition, onCallSharkie }) => {
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
      onClick={onCallSharkie}
    >
      <img
        src={sharkieBtn}
        style={{ marginTop: '12px', display: 'inline-block' }}
        alt='Sharkie'
      />
      <span
        className='color-primary'
        style={textStyles[textPosition] || textStyles['bottom']}
      >
        CALL S.J. SHARKIE!
      </span>
    </button>
  );
};
