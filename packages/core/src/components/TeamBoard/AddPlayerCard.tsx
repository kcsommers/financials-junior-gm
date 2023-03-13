import classNames from 'classnames';
import { motion } from 'framer-motion';
import { PlayerAssignment } from '../../game/teams/players';
import { getAssignmentPosition } from '../../game/teams/utils/get-assignment-position';
import { TutorialComponentConfig } from '../../tutorial/component-configs/tutorial-component-config';
import { toTitleCase } from '../../utils/to-title-case';

type AddPlayerCardProps = {
  slotAssignment?: PlayerAssignment;
  componentConfig?: TutorialComponentConfig<{
    borderColor: string;
  }>;
  onClick?: (slotAssignemnt: PlayerAssignment) => void;
};

export const AddPlayerCard = ({
  slotAssignment,
  onClick,
  componentConfig,
}: AddPlayerCardProps) => {
  const position = getAssignmentPosition(slotAssignment);

  return (
    <div
      className={classNames('inline-flex flex-colc rounded-md', {
        'cursor-pointer': !!onClick,
      })}
      style={{ width: '85px', height: '118px' }}
    >
      <motion.div
        animate="animate"
        exit="exit"
        variants={componentConfig?.variants}
        transition={componentConfig?.transition || { duration: 1 }}
        className="shadow-mat border-2 border-secondary h-full w-full flex-1 bg-light rounded-md"
        onClick={() => {
          onClick && onClick(slotAssignment);
        }}
      >
        <p className="text-primary text-center text-lg h-full inline-flex items-center justify-center">
          Add {position ? toTitleCase(position) : 'Player'}
        </p>
      </motion.div>
    </div>
  );
};
