import sharkiePlay from '../../../../assets/images/sharkie-play.svg';
import sharkieSpeak from '../../../../assets/images/sharkie-speak.svg';
import sharkiePresent from '../../../../assets/images/sharkie-present.svg';
import sharkieLean from '../../../../assets/images/sharkie-lean.svg';
import speechBubble from '../../../../assets/images/speech-bubble.svg';
import { motion, AnimatePresence } from 'framer-motion';
import './Sharkie.css';
import { useState } from 'react';

const sharkieImgs = {
  play: sharkiePlay,
  playInverse: sharkiePlay,
  speak: sharkieSpeak,
  speakInverse: sharkieSpeak,
  present: sharkiePresent,
  presentInverse: sharkiePresent,
  lean: sharkieLean,
};

const sharkieVariants = {
  play: {
    enter: { opacity: 0, x: '50%', y: '50%' },
    center: { opacity: 1, x: '110%', y: '20%' },
    exit: { opacity: 0 },
  },
  playInverse: {
    enter: { opacity: 0, x: '50%', y: '50%' },
    center: { opacity: 1, x: '-92%', y: '20%' },
    exit: { opacity: 0 },
  },
  speak: {
    enter: { opacity: 0, x: '50%', y: '50%' },
    center: { opacity: 1, x: '104%', y: '25%' },
  },
  speakInverse: {
    enter: { opacity: 0, x: '50%', y: '50%' },
    center: { opacity: 1, x: '-86%', y: '25%' },
  },
  present: {
    enter: { opacity: 0, x: '50%', y: '50%' },
    center: { opacity: 1, x: '63%', y: '22%' },
  },
  presentInverse: {
    enter: { opacity: 0, x: '50%', y: '50%' },
    center: { opacity: 1, x: '-85%', y: '22%' },
  },
  lean: {
    enter: { opacity: 0, x: '50%', y: '250%' },
    center: { opacity: 1, x: '-80%', y: '27%' },
  },
};

const speechBubbleVariants = {
  enter: { opacity: 0.5, scale: 0.5 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.2 },
};

export const SharkieComponent = (props) => {
  const [showBubble, setShowBubble] = useState(!props.slide.bubbleDelay);

  const sharkieInverse = props.slide.sharkie.endsWith('Inverse');
  const bubbleInverse = sharkieInverse || props.slide.sharkie === 'lean';

  if (props.slide.bubbleDelay) {
    window.setTimeout(setShowBubble.bind(this, true), props.slide.bubbleDelay);
  }

  return (
    <div className={`sharkie-wrap sharkie-${props.slide.sharkie}-wrap`}>
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={props.slide.id}
            className={`bubble-wrap${bubbleInverse ? ' bubble-inverse' : ''}`}
            variants={speechBubbleVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              scale: {
                type: 'spring',
                stiffness: 500,
              },
            }}
          >
            {props.slide.getJsx()}
            <img
              className='bubble-img'
              src={speechBubble}
              alt={props.slide.message}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          key={props.slide.sharkie}
          className={`sharkie-img-wrap${
            sharkieInverse ? ' sharkie-inverse' : ''
          }`}
          variants={sharkieVariants[props.slide.sharkie]}
          initial='enter'
          animate='center'
          exit='exit'
        >
          <img
            className='sharkie-img'
            src={sharkieImgs[props.slide.sharkie]}
            alt={`Sharkie ${props.slide.sharkie}`}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
