import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAdvanceListener } from '@redux';

export const useAdvanceSlideListener = (callback, slideIndex, updateSlide) => {
  const dispatch = useDispatch();

  const callbackRef = useRef();

  const slideIndexRef = useRef(slideIndex);

  const updateSlideRef = useRef(updateSlide);

  const advance = (data) => {
    if (!callbackRef.current) {
      return false;
    }

    const canAdvance = callbackRef.current(data);
    if (canAdvance) {
      dispatch(setAdvanceListener(null));
      updateSlideRef.current(slideIndexRef.current + 1);
    }

    return canAdvance;
  };

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    slideIndexRef.current = slideIndex;
  }, [slideIndex]);

  useEffect(() => {
    updateSlideRef.current = updateSlide;
  }, [updateSlide]);

  return [advance];
};
