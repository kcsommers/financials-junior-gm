import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { SharkieComponent } from './Sharkie';
import refreshBtn from '@images/refresh-btn.svg';
import checkBtn from '@images/check-btn.svg';
import { setAnimationState, toggleModal } from '@redux/actions';
import { SET_ANIMATION_STATE, TOGGLE_MODAL } from '@redux/actionTypes';
import '@css/tutorial/tutorials.css';

const allActions = {
  [SET_ANIMATION_STATE]: setAnimationState,
  [TOGGLE_MODAL]: toggleModal,
};

let timer = 0;

const buttonVariants = {
  enter: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: 1,
    },
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
  exit: { opacity: 0 },
  inTransition: {
    opacity: 0,
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

export const Tutorial = ({ slides, onComplete }) => {
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
      inPreTransition: false,
    });

    window.setTimeout(() => {
      setState({
        currentSlides: nextSlides,
        slideIndex: 0,
        inTransition: false,
        inPreTransition: false,
      });
    }, 2000);
  };

  const updateSlide = (newIndex) => {
    if (currentSlide.exitActions) {
      currentSlide.exitActions.forEach((a) => {
        dispatch(allActions[a.type](a.payload));
      });
    }

    if (state.currentSlides[newIndex]) {
      setState({
        ...state,
        slideIndex: newIndex,
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

  const onButtonClick = (newIndex) => {
    setState({
      ...state,
      inPreTransition: true,
    });
    window.setTimeout(updateSlide.bind(this, newIndex), 500);
  };

  const buttons = currentSlide.hasButtons ? (
    <AnimatePresence>
      <motion.div
        key={currentSlide.id}
        className='btns-wrap'
        variants={buttonVariants}
        initial='enter'
        animate={
          state.inPreTransition || state.inTransition
            ? 'inTransition'
            : 'center'
        }
        exit='exit'
        transition={{
          duration: 0.5,
        }}
      >
        <button
          className='slide-btn'
          onClick={onButtonClick.bind(
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
          onClick={onButtonClick.bind(this, state.slideIndex + 1)}
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
            className={`slide-wrap${
              currentSlide.small ? ' slide-wrap-small' : ''
            }`}
            animate={{
              x: currentSlide.x || 0,
              y: currentSlide.y || 0,
            }}
          >
            {buttons}
            <SharkieComponent
              slide={currentSlide}
              inTransition={state.inTransition}
            ></SharkieComponent>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
