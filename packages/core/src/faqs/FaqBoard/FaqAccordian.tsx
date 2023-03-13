import { motion } from 'framer-motion';
import { useState } from 'react';
import PlusIcon from '../../components/svg/plus-solid.svg';
import { FAQ } from '../faq';

type FaqAccordianProps = {
  faq: FAQ;
};

export const FaqAccordian = ({ faq }: FaqAccordianProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="shadow-mat p-4 cursor-pointer overflow-hidden"
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <div className="flex items-center">
        <span className="flex justify-center items-center">
          <span className="rounded-full w-6 h-6 flex items-center justify-center border-secondary border-1">
            {/* @ts-ignore */}
            <PlusIcon className="fill-secondary w-3" />
          </span>
        </span>

        <span className="ml-4 text-lg text-primary">{faq.question}</span>
      </div>
      <motion.div
        className="pl-10 mt-8 text-primary text-lg overflow-hidden"
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={{
          collapsed: {
            height: '0px',
            marginTop: '0rem',
          },
          expanded: {
            height: 'auto',
            marginTop: '1rem',
          },
        }}
      >
        <span className="">{faq.answer}</span>
      </motion.div>
    </div>
  );
};
