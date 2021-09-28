import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import cheermeter from '@images/cheermeter.svg';
import cheermeterNeedle from '@images/cheermeter-needle.svg';

export const Cheermeter = ({ cheerLevel = 0 }) => {
  const getRotate = () => {
    const rotate = 12 * cheerLevel;
    return rotate - 25;
  };

  const prevCheerLevel = useRef<number>(cheerLevel);
  useEffect(() => {
    if (prevCheerLevel.current !== cheerLevel) {
      prevCheerLevel.current = cheerLevel;
    }
  }, [cheerLevel]);

  return (
    <div
      className="cheermeter-wrap"
      style={{
        position: 'relative',
      }}
    >
      <img src={cheermeter} alt="Cheermeter" />
      <motion.span
        initial={{
          x: '-58%',
          y: '-70%',
        }}
        animate={{
          rotate: getRotate(),
        }}
        transition={{
          rotate:
            prevCheerLevel.current <= cheerLevel
              ? {
                  type: 'spring',
                  stiffness: 500,
                }
              : {
                  type: 'tween',
                  duration: 2,
                },
        }}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          display: 'inline-block',
          width: '40px',
          height: '40px',
        }}
      >
        <img
          src={cheermeterNeedle}
          alt="Cheermeter Needle"
          style={{
            transform: 'translate(-39%, -14%)',
          }}
        />
      </motion.span>
    </div>
  );
};
