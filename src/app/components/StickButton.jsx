import { Link } from 'react-router-dom';
import '@css/components/StickButton.css';

export const StickButton = ({ link, image, inverse, small, isDisabled }) => {
  return (
    <div
      className={`stick-btn-wrap${small ? ' stick-btn-small' : ''}${
        isDisabled ? ' disabled' : ''
      }`}
    >
      <img
        className={`stick-btn-img${inverse ? ' stick-btn-img-inverse' : ''}`}
        src={image}
        alt={link}
      />
      <Link
        className={`text-link stick-btn-link${
          isDisabled ? ' stick-btn-link-disabled' : ''
        }`}
        to={link}
      ></Link>
    </div>
  );
};
