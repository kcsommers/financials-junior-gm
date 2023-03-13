import classNames from 'classnames';
import { Student } from '../../student/student.interface';
import { Button } from '../Button';

type NextSeasonModalProps = {
  student: Student;
  onRepeatSeason: () => void;
  onNextSeason: () => void;
};

export const NextSeasonModal = ({
  student,
  onRepeatSeason,
  onNextSeason,
}: NextSeasonModalProps) => {
  const isPromoted =
    student.awards &&
    student.awards[+student.level - 1] &&
    student.awards[+student.level - 1].thirdCup &&
    student.awards[+student.level - 1].savingsCup;

  return (
    <div className="h-full flex items-center justify-center flex-col text-center">
      <p className="text-primary text-4xl px-24">
        Your season is complete! What would you like to do next?
      </p>
      <div className="mt-16">
        <span className={classNames({ 'mr-6': isPromoted })}>
          <Button text="Repeat Season" onClick={onRepeatSeason} />
        </span>
        {isPromoted && (
          <span className="ml-6">
            <Button
              text={+student.level === 3 ? 'Accept Award' : 'Accept Promotion'}
              onClick={onNextSeason}
            />
          </span>
        )}
      </div>
    </div>
  );
};
