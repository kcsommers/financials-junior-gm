import React, { useState } from 'react';
import '../tutorials.css';
import { slides } from './intro-tutorial';
import speechBubble from '../../../assets/images/speech-bubble.svg';
import { motion, AnimatePresence } from 'framer-motion';

let timer = 0;

const speechBubbleVariants = {
  enter: { opacity: 0.5, scale: 0.3 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.5 },
};

const IntroTutorial = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  if (timer) {
    window.clearTimeout(timer);
  }

  const currentMsg = slides[msgIndex];

  if (currentMsg.timer) {
    timer = window.setTimeout(() => {
      setMsgIndex(msgIndex + 1);
    }, currentMsg.timer);
  }

  const sharkieVariants = currentMsg.image.variants;

  return (
    <div className='tutorial-container'>
      <div className='cartoon-wrap'>
        <AnimatePresence initial={true}>
          <motion.div
            key={msgIndex}
            className='speech-bubble-wrap'
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              scale: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                duration: 0.2,
              },
            }}
            variants={speechBubbleVariants}
          >
            <img
              className='speech-bubble-img'
              src={speechBubble}
              alt={currentMsg.message.text}
            />
            {currentMsg.message.jsx}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence initial={true}>
          <motion.div
            key={currentMsg.image.key}
            className='sharkie-img-wrap'
            initial='enter'
            animate='center'
            exit='exit'
            variants={sharkieVariants}
            transition={{
              y: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                duration: 0.2,
              },
              scale: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                duration: 0.2,
              },
              opacity: {
                duration: 0.2,
              },
            }}
          >
            {currentMsg.image.jsx}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntroTutorial;
