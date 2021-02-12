import React from 'react';
import '@css/components/ObjectivesBoard.css';

export const ObjectivesBoard = ({ objectives, smallText, level }) => {
  const _objectives = objectives
    ? objectives.map((o) => (
        <div className={`${smallText ? 'objective-text-small' : ''}`} key={o}>
          {o}
        </div>
      ))
    : null;

  return (
    <div className='objectives-board-wrap'>
      <div className='objective-level-box'>
        <div>Objectives</div>
        <div>Level {level}</div>
      </div>
      <div className='ordered-list'>{_objectives}</div>
    </div>
  );
};
