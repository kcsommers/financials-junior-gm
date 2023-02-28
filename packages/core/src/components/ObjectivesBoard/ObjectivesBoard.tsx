import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import {
  Objective,
  ObjectiveNames,
  OBJECTIVES,
} from '../../game/objectives/objectives';
import { scenarioActive } from '../../game/season/scenario-active';
import { Student } from '../../student/student.interface';

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
      setCurrentObjectives(cloneDeep(OBJECTIVES));
      return;
    }
    const clonedObjectives = OBJECTIVES.map((o) => {
      const clonedO = cloneDeep(o);
      clonedO.isComplete = student.objectives[clonedO.name];
      return clonedO;
    });
    if (scenarioActive(student)) {
      clonedObjectives.unshift({
        name: ObjectiveNames.SEASON_SCENARIO,
        message: 'Replace the injured player',
        isComplete: false,
        isUrgent: true,
      });
    }
    setCurrentObjectives(clonedObjectives);
  }, [student]);

  const hasUrgent = useMemo(() => {
    return (currentObjectives || []).some((o) => o.isUrgent);
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
        'border-10 rounded-md px-4 pt-2',
        'text-white shadow-mat bg-neutral-700',
        hasUrgent ? 'border-highlight' : 'border-primary'
      )}
      style={{ width: size === 'small' ? '350px' : '425px' }}
    >
      <div className="flex justify-between text-2xl font-bold">
        <div>Objectives</div>
        <div>Level {student.level}</div>
      </div>
      {!!objectivesView.length ? (
        <ol className="list-inside list-decimal">{objectivesView}</ol>
      ) : (
        <span>Season is complete!</span>
      )}
    </div>
  );
};
