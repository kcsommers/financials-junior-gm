import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import '@css/components/StickButton.css';

export const StickButton = ({
  tutorialActive,
  animationState,
  link,
  image,
  inverse,
}) => {
  console.log('LINK:::: ', link);

  return (
    <div className='stick-btn-wrap'>
      <ReactSVG
        className={`stick-btn-img${inverse ? ' stick-btn-img-inverse' : ''}`}
        src={image}
      />
      <Link className='text-link stick-btn-link' to={link}></Link>
    </div>
  );
};
