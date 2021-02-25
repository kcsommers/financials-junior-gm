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
  hideDuringTutorial,
  inTransition,
  isDisabled,
}) => {
  return tutorialActive ? (
    <motion.div
      className={`stick-btn-wrap${small ? ' stick-btn-small' : ''}${
        hideDuringTutorial ? ' transparent' : ''
      }${isDisabled ? ' disabled' : ''}`}
      animate={animationState}
      style={styles}
    >
      <ReactSVG
        className={`stick-btn-img${inverse ? ' stick-btn-img-inverse' : ''}`}
        src={image}
      />
      <Link
        className='text-link stick-btn-link stick-btn-link-disabled'
        to={link}
      ></Link>
    </motion.div>
  ) : (
    <div
      className={`stick-btn-wrap${small ? ' stick-btn-small' : ''}${
        isDisabled ? ' disabled' : ''
      }`}
      style={styles}
    >
      <ReactSVG
        className={`stick-btn-img${inverse ? ' stick-btn-img-inverse' : ''}`}
        src={image}
      />
      <Link
        className={`text-link stick-btn-link${
          inTransition ? ' stick-btn-link-disabled' : ''
        }`}
        to={link}
      ></Link>
    </div>
  );
};
