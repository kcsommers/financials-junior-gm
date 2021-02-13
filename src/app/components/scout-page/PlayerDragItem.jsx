import { PlayerCard } from '@components';

export const PlayerDragItem = ({ provided, innerRef, player, onClick }) => {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <PlayerCard player={player} onClick={onClick} />
    </div>
  );
};
