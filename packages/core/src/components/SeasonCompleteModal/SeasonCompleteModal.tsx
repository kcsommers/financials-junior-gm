import { StudentTeam } from '../../game/teams/student-team.type';
import { addOrdinalSuffix } from '../../utils/add-ordinal-suffix';
import { Button } from '../Button';
import TrophyIcon from '../svg/trophy.svg';

type SeasonCompleteModalProps = {
  studentTeam: StudentTeam;
  onClose: () => void;
};

export const SeasonCompleteModal = ({
  studentTeam,
  onClose,
}: SeasonCompleteModalProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h4 className="text-primary text-4xl">
        Great job! You came in{' '}
        <span className="text-secondary">
          {addOrdinalSuffix(studentTeam.stats.standing)}
        </span>{' '}
        place
      </h4>
      <div className="my-8">
        {/* @ts-ignore */}
        <TrophyIcon width="160px" />
      </div>

      <p className="text-primary text-3xl mb-8">
        Check out your awards in the trophy room!
      </p>
      <Button text="See Trophies" href="/game/trophies" onClick={onClose} />
    </div>
  );
};
