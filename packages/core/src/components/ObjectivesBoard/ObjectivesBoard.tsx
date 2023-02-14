import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { Student } from '../../student/student.interface';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Objective, OBJECTIVES } from '../../game/objectives/objectives';
import styles from './ObjectivesBoard.module.scss';

type ObjectsBoardProps = {
  size?: 'large' | 'small';
  visibleObjectives?: number;
  filterComplete?: boolean;
};

export const ObjectivesBoard = ({
  size = 'large',
  visibleObjectives = 3,
  filterComplete = false,
}: ObjectsBoardProps) => {
  const student = useAuth().authorizedUser as Student;
  const [currentObjectives, setCurrentObjectives] = useState<Objective[]>(
    cloneDeep(OBJECTIVES)
  );

  // update current objectives whenever student updates
  useEffect(() => {
    if (!student?.objectives) {
      return;
    }
    const clonedObjectives = OBJECTIVES.map((o) => {
      const clonedO = cloneDeep(o);
      clonedO.isComplete = student.objectives[clonedO.name];
      return clonedO;
    });
    setCurrentObjectives(clonedObjectives);
  }, [student]);

  const hasUrgent = useMemo(() => {
    (currentObjectives || []).some((o) => o.isUrgent);
  }, [currentObjectives]);

  const objectivesView: any[] = [];
  let i = 0;
  while (
    objectivesView.length < visibleObjectives &&
    i < currentObjectives.length
  ) {
    if (!filterComplete || !currentObjectives[i].isComplete) {
      objectivesView.push(
        <li
          className={classNames('my-2 text-lg', {
            'line-through': currentObjectives[i].isComplete,
            'text-highlight': currentObjectives[i].isUrgent,
            'text-base': size === 'small',
          })}
          key={currentObjectives[i].name}
        >
          {currentObjectives[i].message}
        </li>
      );
    }
    i++;
  }

  return !student ? (
    <LoadingSpinner />
  ) : (
    <div
      className={classNames(
        'border-10 border-primary rounded-md px-4 py-2',
        'text-white shadow-mat bg-neutral-700',
        { 'border-highlight': hasUrgent }
      )}
      style={{ width: size === 'small' ? '350px' : '425px' }}
    >
      <div className="flex justify-between text-2xl font-bold">
        <div>Objectives</div>
        <div>Level {student.level}</div>
      </div>
      <ol className={styles.ordered_list}>{objectivesView}</ol>
    </div>
  );
};
