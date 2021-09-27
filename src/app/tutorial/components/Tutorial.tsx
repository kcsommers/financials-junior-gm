import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { SharkieComponent } from './Sharkie';
import backBtn from '@images/back-btn.svg';
import backBtnRvrsd from '@images/back-btn-reversed.svg';
import { setAnimationState, toggleOverlay, setAdvanceListener } from '@redux';
import '@css/tutorial/tutorials.css';
import { useAdvanceSlideListener } from '../../hooks/use-advance-slide-listener';

const allActions = {
  SET_ANIMATION_STATE: setAnimationState,
  TOGGLE_OVERLAY: toggleOverlay,
  SET_ADVANCE_LISTENER: setAdvanceListener,
};

let timer = 0;

const containerVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

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

export const Tutorial = ({ slides, onComplete }) => {
  const [state, setState] = useState({
    slideIndex: 0,
    currentSlides: slides[0],
    inTransition: false,
    isComplete: false,
    inPreTransition: false,
  });

  const [buttonsAnimating, setButtonsAnimating] = useState(false);

  const dispatch = useDispatch();

  const slideIndexRef = useRef(state.slideIndex);

  const [shouldAdvance, setShouldAdvance] = useState(null);

  if (timer) {
    window.clearTimeout(timer);
  }

  const currentSlide = state.currentSlides[state.slideIndex];

  if (currentSlide.timer && !state.isComplete) {
    timer = window.setTimeout(() => {
      updateSlide(state.slideIndex + 1);
    }, currentSlide.timer);
  }

  // @TODO
  const tutorialComplete = (canceled = false) => {
    setState({
      ...state,
      isComplete: true,
    });
    // allow a second to animate out
    window.setTimeout(() => {
      onComplete(canceled);
    }, 1000);
  };

  const setNextLesson = (nextSlides) => {
    slideIndexRef.current = 0;

    setState({
      ...state,
      inTransition: true,
      inPreTransition: false,
    });

    setButtonsAnimating(false);
    window.setTimeout(() => {
      setState({
        ...state,
        currentSlides: nextSlides,
        slideIndex: 0,
        inTransition: false,
        inPreTransition: false,
      });
      setButtonsAnimating(false);
    }, 2000);
  };

  const updateSlide = (newIndex) => {
    const actions =
      slideIndexRef.current > newIndex
        ? currentSlide.previousActions
        : currentSlide.exitActions;

    slideIndexRef.current = newIndex;

    if (actions) {
      actions.forEach((a) => {
        let payload = a.payload;

        // if the action is an advance slide listener
        // set the method returned from the hook in redux store
        // to be used across the app
        // also need to update listener locally in order to update the hook
        if (a.type === 'SET_ADVANCE_LISTENER') {
          setShouldAdvance(() => a.payload);
          payload = onAdvanceEvent;
        }

        dispatch(allActions[a.type](payload));
      });
    }

    if (state.currentSlides[newIndex]) {
      setState({
        ...state,
        slideIndex: newIndex,
      });

      window.setTimeout(() => {
        setButtonsAnimating(false);
      }, 1000);
    } else {
      // check for next lesson
      const currentSlidesIndex = slides.indexOf(state.currentSlides);
      const nextSlides = slides[currentSlidesIndex + 1];
      if (!nextSlides) {
        // if none, we're done
        tutorialComplete();
        return;
      }

      // we've reached the end of this lesson, transition to next
      setNextLesson(nextSlides);
    }
  };
  const [onAdvanceEvent] = useAdvanceSlideListener(
    shouldAdvance,
    state.slideIndex,
    updateSlide
  );

  const onButtonClick = (newIndex) => {
    if (buttonsAnimating || state.inPreTransition || state.inTransition) {
      return;
    }

    setState({
      ...state,
      inPreTransition: true,
    });
    setButtonsAnimating(true);
    window.setTimeout(updateSlide.bind(this, newIndex), 500);
  };

  const onCancelClick = () => {
    if (currentSlide.canCancel) {
      tutorialComplete(true);
      return;
    }
    const newIndex = !isNaN(currentSlide.repeatIndex)
      ? currentSlide.repeatIndex
      : state.slideIndex - 1;
    onButtonClick(newIndex);
  };

  const buttons = currentSlide.hasButtons ? (
    <AnimatePresence>
      <motion.div
        key={currentSlide.id}
        className="btns-wrap"
        variants={buttonVariants}
        initial="enter"
        animate={
          state.inPreTransition || state.inTransition
            ? 'inTransition'
            : 'center'
        }
        exit="exit"
        transition={{
          duration: 0.5,
        }}
      >
        <button className="slide-btn" onClick={onCancelClick}>
          <img className="action-btn" src={backBtn} alt="Back" />
          <span style={{ color: '#121210' }}>
            {currentSlide.canCancel ? 'Cancel' : 'Back'}
          </span>
        </button>
        <button
          className="slide-btn"
          onClick={onButtonClick.bind(this, state.slideIndex + 1)}
        >
          <img className="action-btn" src={backBtnRvrsd} alt="Next!" />
          <span style={{ color: '#121210' }}>
            {currentSlide.canCancel ? 'Yes' : 'Next'}
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  ) : null;

  return (
    <motion.div
      className={`tutorial-container${
        currentSlide.transparentBg ? ' transparent' : ''
      }`}
      animate={state.isComplete ? 'hidden' : 'visible'}
      variants={containerVariants}
    >
      <div className="tutorial-container-inner">
        <motion.div
          className={`slide-wrap${
            currentSlide.small ? ' slide-wrap-small' : ''
          }`}
          animate={currentSlide.slideAnimate}
        >
          <SharkieComponent
            slide={currentSlide}
            inTransition={state.inTransition}
          ></SharkieComponent>
          {buttons}
        </motion.div>
      </div>
    </motion.div>
  );
};
