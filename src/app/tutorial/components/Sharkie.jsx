import sharkiePlay from '@images/sharkie-play.svg';
import sharkieSpeak from '@images/sharkie-speak.svg';
import sharkiePresent from '@images/sharkie-present.svg';
import sharkieLean from '@images/sharkie-lean.svg';
import speechBubble from '@images/speech-bubble.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import '@css/tutorial/Sharkie.css';

const sharkieImgs = {
  play: sharkiePlay,
  playInverse: sharkiePlay,
  speak: sharkieSpeak,
  speakInverse: sharkieSpeak,
  present: sharkiePresent,
  presentInverse: sharkiePresent,
  lean: sharkieLean,
};

const containerVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const defaultSharkieVariants = {
  play: {
    enter: { opacity: 0 },
    center: { opacity: 1, x: '110%', y: '20%' },
  },
  playInverse: {
    enter: { opacity: 0 },
    center: { opacity: 1, x: '-92%', y: '20%' },
  },
  speak: {
    enter: { opacity: 0 },
    center: { opacity: 1, x: '104%', y: '25%' },
  },
  speakInverse: {
    enter: { opacity: 0 },
    center: { opacity: 1, x: '-86%', y: '25%' },
  },
  present: {
    enter: { opacity: 0 },
    center: { opacity: 1, x: '74%', y: '27%' },
  },
  presentInverse: {
    enter: { opacity: 0 },
    center: { opacity: 1, x: '-84%', y: '27%' },
  },
  lean: {
    enter: { opacity: 0 },
    center: { opacity: 1, x: '-80%', y: '27%' },
  },
};

const speechBubbleVariants = {
  enter: { opacity: 0.5, scale: 0.5 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.2 },
};

export const SharkieComponent = ({ slide, inTransition }) => {
  const [showBubble, setShowBubble] = useState(!slide.bubbleDelay);

  const sharkieInverse = slide.sharkie.endsWith('Inverse');
  const bubbleInverse = sharkieInverse || slide.sharkie === 'lean';

  if (slide.bubbleDelay) {
    const bubbleDelay = slide.bubbleDelay;
    window.setTimeout(setShowBubble.bind(this, true), slide.bubbleDelay);
    slide.bubbleDelay = 0;
    setShowBubble(false);
  }

  return (
    <motion.div
      className={`sharkie-wrap sharkie-${slide.sharkie}-wrap`}
      animate={inTransition ? 'hidden' : 'visible'}
      variants={containerVariants}
    >
      <AnimatePresence>
        <motion.div
          key={slide.sharkie}
          className={`sharkie-img-wrap${
            sharkieInverse ? ' sharkie-inverse' : ''
          }`}
          variants={
            slide.sharkieVariants || defaultSharkieVariants[slide.sharkie]
          }
          initial='enter'
          animate='center'
          exit='exit'
        >
          <img
            className='sharkie-img'
            src={sharkieImgs[slide.sharkie]}
            alt={`Sharkie ${slide.sharkie}`}
          />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={slide.id}
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
            <img
              className='bubble-img'
              src={speechBubble}
              alt={slide.message}
            />
            {slide.getJsx()}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
