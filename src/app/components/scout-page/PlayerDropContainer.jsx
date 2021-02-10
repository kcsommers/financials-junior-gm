export const PlayerDropContainer = (props) => {
  const { provided, innerRef, children, player } = props;
  return (
    <div {...provided.droppableProps} ref={innerRef} className='drop-container'>
      {children}
    </div>
  );
};
