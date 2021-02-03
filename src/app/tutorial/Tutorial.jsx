import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { SharkieComponent } from './components/Sharkie/Sharkie';
import introSlides from './slides/intro-slides';
import objectivesSlides from './slides/objectives-slides';
import moneyLeftSlides from './slides/money-left-slides';
import teamRankSlides from './slides/team-rank-slides';
import refreshBtn from '../../assets/images/refresh-btn.svg';
import checkBtn from '../../assets/images/check-btn.svg';
import './tutorials.css';
import { useDispatch } from 'react-redux';
import { setAnimationState } from './../redux/actions';
import { SET_ANIMATION_STATE } from './../redux/actionTypes';

const allActions = {
  [SET_ANIMATION_STATE]: setAnimationState,
};

let timer = 0;

const slides = [moneyLeftSlides];

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
  transition: {
    opacity: 0.5,
    y: '-100%',
  },
};

const containerVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const Tutorial = ({ onComplete }) => {
  console.log('tutorialRender::::');
  const [state, setState] = useState({
    slideIndex: 0,
    currentSlides: slides[0],
    inTransition: false,
  });

  const dispatch = useDispatch();

  if (timer) {
    window.clearTimeout(timer);
  }

  const currentSlide = state.currentSlides[state.slideIndex];

  if (currentSlide.timer) {
    timer = window.setTimeout(() => {
      updateSlide(state.slideIndex + 1);
    }, currentSlide.timer);
  }

  if (currentSlide.enterActions) {
    currentSlide.enterActions.forEach((a) => {
      dispatch(allActions[a.type](a.payload));
    });
  }

  const setNextLesson = (nextSlides) => {
    setState({
      ...state,
      inTransition: true,
    });

    window.setTimeout(() => {
      setState({
        currentSlides: nextSlides,
        slideIndex: 0,
        inTransition: false,
      });
    }, 2000);
  };

  const updateSlide = (index) => {
    const nextSlide = state.currentSlides[index];

    if (currentSlide.exitActions) {
      currentSlide.exitActions.forEach((a) => {
        dispatch(allActions[a.type](a.payload));
      });
    }

    if (nextSlide) {
      setState({
        ...state,
        slideIndex: index,
      });
    } else {
      // check for next lesson
      const currentSlidesIndex = slides.indexOf(state.currentSlides);
      const nextSlides = slides[currentSlidesIndex + 1];
      if (!nextSlides) {
        // if none, we're done
        onComplete();
        return;
      }

      // we've reached the end of this lesson, transition to next
      setNextLesson(nextSlides);
    }
  };

  const buttons = currentSlide.hasButtons ? (
    <AnimatePresence>
      <motion.div
        className='btns-wrap'
        variants={buttonVariants}
        initial='enter'
        animate={state.inTransition ? 'transition' : 'center'}
        exit='exit'
        duration='10'
        transition={{
          duration: 1,
        }}
      >
        <button
          className='slide-btn'
          onClick={updateSlide.bind(
            this,
            !isNaN(currentSlide.repeatIndex)
              ? currentSlide.repeatIndex
              : state.slideIndex - 1
          )}
        >
          <img className='action-btn' src={refreshBtn} alt='Repeat' />
          <span className='color-primary'>Repeat</span>
        </button>
        <button
          className='slide-btn'
          onClick={updateSlide.bind(this, state.slideIndex + 1)}
        >
          <img className='action-btn' src={checkBtn} alt='Yes!' />
          <span className='color-primary'>Yes!</span>
        </button>
      </motion.div>
    </AnimatePresence>
  ) : null;

  return (
    <div className='tutorial-container'>
      <AnimatePresence>
        <motion.div
          className='tutorial-container-inner'
          animate={state.inTransition ? 'hidden' : 'visible'}
          variants={containerVariants}
          exit='hidden'
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
      </AnimatePresence>
    </div>
  );
};

export default Tutorial;
