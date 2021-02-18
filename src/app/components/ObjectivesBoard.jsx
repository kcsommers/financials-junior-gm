import React from 'react';
import { useSelector } from 'react-redux';
import '@css/components/ObjectivesBoard.css';

export const ObjectivesBoard = ({ objectives, smallText, level }) => {
  const currentScenario = useSelector((state) => state.season.currentScenario);

  const _objectives = currentScenario
    ? [currentScenario.objective]
    : objectives;

  const objectivesView = _objectives
    ? _objectives.map((o) => (
        <div className={`${smallText ? 'objective-text-small' : ''}`} key={o}>
          {o}
        </div>
      ))
    : null;

  return (
    <div
      className={`objectives-board-wrap${
        currentScenario ? ' has-scenario' : ''
      }`}
    >
      <div className='objective-level-box'>
        <div>Objectives</div>
        <div>Level {level}</div>
      </div>
      <div className='ordered-list'>{objectivesView}</div>
    </div>
  );
};
