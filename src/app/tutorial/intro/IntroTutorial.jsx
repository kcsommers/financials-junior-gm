import React, { useState } from 'react';
import '../tutorials.css';
import slides from './intro-slides';
import tutorial from '../TutorialHOC';
import { SharkieComponent } from '../components/Sharkie/Sharkie';
import refreshBtn from '../../../assets/images/refresh-btn.svg';
import checkBtn from '../../../assets/images/check-btn.svg';
import { motion, AnimatePresence } from 'framer-motion';

let timer = 0;

const buttonVariants = {
  enter: {
    opacity: 0,
    y: '100%',
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: { opacity: 0 },
  clicked: {
    opacity: 1,
    y: '-100%',
  },
};

const IntroTutorial = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);

  if (timer) {
    window.clearTimeout(timer);
  }

  const currentSlide = slides[msgIndex];

  if (currentSlide.timer) {
    timer = window.setTimeout(() => {
      setMsgIndex(msgIndex + 1);
    }, currentSlide.timer);
  }

  const next = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
      setMsgIndex(msgIndex + 1);
    }, 800);
  };

  const prev = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
      setMsgIndex(msgIndex - 1);
    }, 800);
  };

  const buttons = currentSlide.hasButtons ? (
    <AnimatePresence>
      <motion.div
        className='btns-wrap'
        variants={buttonVariants}
        initial='enter'
        animate={buttonClicked ? 'clicked' : 'center'}
        exit='exit'
        duration='10'
        transition={{
          duration: 1,
        }}
      >
        <button onClick={prev.bind(this)} className='slide-btn'>
          <img className='action-btn' src={refreshBtn} alt='Repeat' />
          <span className='color-primary'>Repeat</span>
        </button>
        <button onClick={next.bind(this)} className='slide-btn'>
          <img className='action-btn' src={checkBtn} alt='Yes!' />
          <span className='color-primary'>Yes!</span>
        </button>
      </motion.div>
    </AnimatePresence>
  ) : null;

  return (
    <div className='tutorial-container'>
      <div className='slide-wrap'>
        {buttons}
        <SharkieComponent slide={currentSlide}></SharkieComponent>
      </div>
    </div>
  );
};

export default tutorial(IntroTutorial);
