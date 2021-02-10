import { setTutorialIsActive } from '@redux/actions';
import { useDispatch } from 'react-redux';
import sharkieBtn from '@images/sharkie-btn.svg';
import { ReactSVG } from 'react-svg';

export const SharkieButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className='sharkie-btn'
      style={{
        outline: 'none',
        border: 'none',
        background: 'none',
      }}
      onClick={() => {
        console.log('SETTING');
        dispatch(setTutorialIsActive({ isActive: true }));
      }}
    >
      <ReactSVG src={sharkieBtn} />
      <span
        className='color-primary'
        style={{
          fontSize: '0.8rem',
          position: 'relative',
          top: '-1rem',
          display: 'inline-block',
        }}
      >
        CALL SHARKIE
      </span>
    </button>
  );
};
