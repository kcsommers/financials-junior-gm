import { PropsWithChildren, useRef } from 'react';
import { useDrop } from 'react-dnd';

type DraggableItemProps<T> = PropsWithChildren<{
  type: string;
  isOverStyles?: { [key: string]: any };
  onDrop?: (item: T) => void;
}>;

export const DroppableItem = <T,>({
  type,
  onDrop,
  children,
  isOverStyles,
}: DraggableItemProps<T>) => {
  const ref = useRef();
  const [{ isOver }, drop] = useDrop({
    accept: type,
    drop: (item: T) => {
      if (onDrop) {
        onDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div style={isOver && isOverStyles ? isOverStyles : {}} ref={ref}>
      {children}
    </div>
  );
};
