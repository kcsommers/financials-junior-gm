export const PlayerDropContainer = (props) => {
  const { provided, innerRef, children, player } = props;
  return (
    <div
      {...provided.droppableProps}
      ref={innerRef}
      className={`drop-container${
        player ? ' drop-disabled' : ' drag-disabled'
      }`}
    >
      {children}
    </div>
  );
};
