import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SharkieComponent } from './components/Sharkie/Sharkie';
import introSlides from './slides/intro-slides';
import objectivesSlides from './slides/objectives-slides';
import moneyLeftSlides from './slides/money-left-slides';
import teamRankSlides from './slides/team-rank-slides';
import refreshBtn from '../../assets/images/refresh-btn.svg';
import checkBtn from '../../assets/images/check-btn.svg';
import './tutorials.css';

let timer = 0;

const slides = [introSlides, objectivesSlides, teamRankSlides, moneyLeftSlides];

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

const Tutorial = () => {
  const [state, setState] = useState({
    slideIndex: 0,
    buttonClicked: false,
    currentSlides: slides[0],
    isActive: true,
  });

  if (timer) {
    window.clearTimeout(timer);
  }

  const currentSlide = state.currentSlides[state.slideIndex];

  if (currentSlide.timer) {
    timer = window.setTimeout(() => {
      updateSlide(state.slideIndex + 1);
    }, currentSlide.timer);
  }

  const updateSlide = (index) => {
    const nextSlide = state.currentSlides[index];

    if (nextSlide) {
      setState({
        ...state,
        buttonClicked: false,
        slideIndex: index,
      });
    } else {
      // we've reached the end of this lesson, animate out
      setState({
        ...state,
        isActive: false,
      });

      // check for next lesson
      const currentSlidesIndex = slides.indexOf(state.currentSlides);
      const nextSlides = slides[currentSlidesIndex + 1];
      if (!nextSlides) {
        // if none, we're done
        return;
      }

      // otherwise set timer to start the next one
      window.setTimeout(() => {
        setState({
          slideIndex: 0,
          buttonClicked: false,
          currentSlides: nextSlides,
          isActive: true,
        });
      }, 2000);
    }
  };

  const onButtonClick = (nextIndex) => {
    setState({
      ...state,
      buttonClicked: true,
    });
    setTimeout(updateSlide.bind(this, nextIndex), 800);
  };

  const buttons = currentSlide.hasButtons ? (
    <AnimatePresence>
      <motion.div
        className='btns-wrap'
        variants={buttonVariants}
        initial='enter'
        animate={state.buttonClicked ? 'clicked' : 'center'}
        exit='exit'
        duration='10'
        transition={{
          duration: 1,
        }}
      >
        <button
          onClick={onButtonClick.bind(
            this,
            !isNaN(currentSlide.repeatIndex)
              ? currentSlide.repeatIndex
              : state.slideIndex - 1
          )}
          className='slide-btn'
        >
          <img className='action-btn' src={refreshBtn} alt='Repeat' />
          <span className='color-primary'>Repeat</span>
        </button>
        <button
          onClick={onButtonClick.bind(this, state.slideIndex + 1)}
          className='slide-btn'
        >
          <img className='action-btn' src={checkBtn} alt='Yes!' />
          <span className='color-primary'>Yes!</span>
        </button>
      </motion.div>
    </AnimatePresence>
  ) : null;

  return (
    <AnimatePresence>
      {state.isActive && (
        <motion.div
          className='tutorial-container'
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
          }}
        >
          <motion.div
            className='slide-wrap'
            animate={{
              x: currentSlide.x || 0,
              y: currentSlide.y || 0,
            }}
          >
            {buttons}
            <SharkieComponent slide={currentSlide}></SharkieComponent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tutorial;
