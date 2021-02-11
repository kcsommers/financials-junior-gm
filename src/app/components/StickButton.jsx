import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { motion } from 'framer-motion';
import '@css/components/StickButton.css';

export const StickButton = ({
  tutorialActive,
  animationState,
  link,
  image,
  inverse,
  small,
  styles,
}) => {
  return tutorialActive ? (
    <motion.div
      className={`hidden stick-btn-wrap${small ? ' stick-btn-small' : ''}`}
      animate={animationState}
      style={styles}
    >
      <ReactSVG
        className={`stick-btn-img${inverse ? ' stick-btn-img-inverse' : ''}`}
        src={image}
      />
      <Link className='text-link stick-btn-link' to={link}></Link>
    </motion.div>
  ) : (
    <div
      className={`stick-btn-wrap${small ? ' stick-btn-small' : ''}`}
      style={styles}
    >
      <ReactSVG
        className={`stick-btn-img${inverse ? ' stick-btn-img-inverse' : ''}`}
        src={image}
      />
      <Link className='text-link stick-btn-link' to={link}></Link>
    </div>
  );
};
