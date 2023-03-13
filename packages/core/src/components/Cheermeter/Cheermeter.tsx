import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import CheermeterNeedle from '../../components/svg/cheermeter-needle.svg';
import CheermeterSvg from '../../components/svg/cheermeter.svg';

type CheermeterProps = {
  cheerLevel: number;
};

export const Cheermeter = ({ cheerLevel }: CheermeterProps) => {
  const prevCheerLevel = useRef(cheerLevel);

  const getRotate = () => {
    const rotate = 12 * cheerLevel;
    return rotate - 25;
  };

  useEffect(() => {
    prevCheerLevel.current = cheerLevel;
  }, [cheerLevel]);

  return (
    <div className="relative">
      <CheermeterSvg />
      <motion.span
        className="absolute left-1/2 bottom-0 inline-block w-[40px] h-[40px]"
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
      >
        <span
          className="inline-block"
          style={{ transform: 'translate(-39%, -14%)' }}
        >
          <CheermeterNeedle />
        </span>
      </motion.span>
    </div>
  );
};
