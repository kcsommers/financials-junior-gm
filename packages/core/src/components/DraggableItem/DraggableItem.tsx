import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';

type DraggableItemProps<T> = PropsWithChildren<{
  type: string;
  item: T;
  placeholder?: ReactNode;
}>;

export const DraggableItem = <T,>({
  children,
  type,
  item,
  placeholder,
}: DraggableItemProps<T>) => {
  const ref = useRef();

  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item,
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));
  drag(ref);

  useEffect(() => {
    if (isDragging) {
      document.body.classList.add('dragging-item');
    } else {
      document.body.classList.remove('dragging-item');
    }
    return () => document.body.classList.remove('dragging-item');
  }, [isDragging]);

  return isDragging && !!placeholder ? (
    <>{placeholder}</>
  ) : (
    <div ref={ref} style={{ opacity: isDragging ? 0.3 : 1 }}>
      {children}
    </div>
  );
};
