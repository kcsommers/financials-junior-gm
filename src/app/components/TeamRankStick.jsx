import React from 'react';
import { ReactSVG } from 'react-svg';
import icon from '@images/icons/hockey-visual-1.svg';
import { Indicator } from '@components';
import '@css/components/amount-stick.css';

export const TeamRankStick = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <ReactSVG
        style={{
          position: 'relative',
          right: '-12%',
          top: '0.25rem',
        }}
        src={icon}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '0.5rem',
        }}
      >
        <span
          style={{
            color: '#ea7200',
            display: 'inline-block',
            fontSize: '1rem',
            marginRight: '0.25rem',
          }}
        >
          Team <br /> Rank
        </span>
        <Indicator amount={25} direction='right' />
      </div>
    </div>
  );
};
