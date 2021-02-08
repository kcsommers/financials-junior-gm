export const DropContainer = (props) => {
  const { provided, innerRef, children } = props;
  return (
    <div {...provided.droppableProps} ref={innerRef} className='drop-container'>
      {children}
    </div>
  );
};
