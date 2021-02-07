export const DragItem = (props) => {
  const { provided, innerRef, children } = props;
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      {children}
    </div>
  );
};
