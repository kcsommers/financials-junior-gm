import { memo } from 'react';

export const PlayerDropContainer = memo(
  ({ provided, innerRef, children, player, isDraggingOver }: any) => {
    return (
      <div
        {...provided.droppableProps}
        ref={innerRef}
        className={`drop-container${
          player ? ' drop-disabled' : ' drag-disabled'
        }`}
        style={
          !player && isDraggingOver
            ? {
                transform: 'scale(1.1)',
              }
            : {}
        }
      >
        {children}
      </div>
    );
  }
);
