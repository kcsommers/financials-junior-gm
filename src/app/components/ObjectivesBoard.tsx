import React from 'react';
import '@css/components/ObjectivesBoard.css';
import { useAppSelector } from '@redux';

export const ObjectivesBoard = ({
  smallText = false,
  level,
  visibleObjectives,
  filterComplete,
}) => {
  const { currentObjectives } = useAppSelector((state) => state.objectives);

  const objectivesView: any[] = [];
  let i = 0;
  while (
    objectivesView.length < visibleObjectives &&
    i < currentObjectives.length
  ) {
    if (!filterComplete || !currentObjectives[i].isComplete) {
      objectivesView.push(
        <li
          className={`${smallText ? 'objective-text-small' : ''}${
            currentObjectives[i].isComplete ? ' objective-complete' : ''
          }${currentObjectives[i].isUrgent ? ' is-urgent' : ''}`}
          key={currentObjectives[i].id}
        >
          {currentObjectives[i].objective}
        </li>
      );
    }
    i++;
  }

  return (
    <div
      className={`objectives-board-wrap${
        currentObjectives[0].isUrgent ? ' is-urgent' : ''
      }`}
    >
      <div className="objective-level-box">
        <div>Objectives</div>
        <div>Level {level}</div>
      </div>
      <ol className="ordered-list">{objectivesView}</ol>
    </div>
  );
};
