import '@css/components/Button.css';

export const Button = ({
  text,
  background = '#ea7200',
  color = '#fff',
  onClick,
}) => {
  return (
    <div
      className={`box-shadow btn`}
      style={{ backgroundColor: background, color: color }}
      onClick={onClick}
    >
      <div className='btn-inner'>
        <span className='outline-black'>{text}</span>
      </div>
    </div>
  );
};
