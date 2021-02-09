import { setTutorialIsActive } from '@redux/actions';
import { useDispatch } from 'react-redux';

const styles = {
  width: '70px',
  height: '70px',
  borderRadius: '100%',
  backgroundColor: '#00788a',
};

export const SharkieButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className='sharkie-btn'
      style={styles}
      onClick={() => {
        console.log('SETTING');
        dispatch(setTutorialIsActive({ isActive: true }));
      }}
    ></button>
  );
};
