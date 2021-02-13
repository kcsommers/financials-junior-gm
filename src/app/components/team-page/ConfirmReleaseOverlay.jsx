import { TeamBudgetState, PlayerReleased } from '../public-api';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';

export const ConfirmReleaseOverlay = ({ player, cancel, confirm }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: null,
      })
    );
  };

  const handleConfirm = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <PlayerReleased />,
      })
    );
  };

  return (
    <ConfirmOverlay
      message='Are you sure you want to release the following player?'
      cancel={cancel}
      confirm={confirm.bind(this, player)}
    >
      <div className='confirm-release-overlay'>
        <TeamBudgetState title='Changes to Rank and Budget' />
      </div>
    </ConfirmOverlay>
  );
};
