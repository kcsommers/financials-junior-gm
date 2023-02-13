import { PlayerAssignment } from '../../game/teams/players';
import { getAssignmentPosition } from '../../game/teams/utils/get-assignment-position';
import { toTitleCase } from '../../utils/to-title-case';

type AddPlayerCardProps = {
  slotAssignment: PlayerAssignment;
  onClick: (slotAssignemnt: PlayerAssignment) => void;
};

export const AddPlayerCard = ({
  slotAssignment,
  onClick,
}: AddPlayerCardProps) => {
  const position = getAssignmentPosition(slotAssignment);

  return (
    <div
      className="cursor-pointer inline-flex flex-colc rounded-md"
      style={{ width: '85px', height: '118px' }}
    >
      <div
        className="shadow-mat border-2 border-secondary h-full w-full flex-1 bg-light rounded-md"
        onClick={() => {
          onClick(slotAssignment);
        }}
      >
        <p className="text-primary text-center text-lg h-full inline-flex items-center justify-center">
          Add {position ? toTitleCase(position) : 'Player'}
        </p>
      </div>
    </div>
  );
};
