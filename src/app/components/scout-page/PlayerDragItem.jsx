import { PlayerCard } from '@components';

export const PlayerDragItem = (props) => {
  const { provided, innerRef, player } = props;
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <PlayerCard player={player} isDraggable={true} />
    </div>
  );
};
