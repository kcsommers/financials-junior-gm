import React from 'react';
import { ReactSVG } from 'react-svg';
import teamRank from '@images/icons/hockey-visual-1.svg';
import budget from '@images/icons/hockey-visual-2.svg';
import { Indicator } from '@components';

const styles = {
  teamRank: {
    image: {
      position: 'relative',
      right: '-50px',
      top: 0,
    },
    indicator: {
      position: 'absolute',
      top: 0,
      right: '40px',
    },
    text: {
      color: '#ea7200',
      display: 'inline-block',
      fontSize: '1rem',
      marginRight: '0.25rem',
      fontWeight: 'bold',
    },
  },
  budget: {
    image: {
      position: 'relative',
      left: '-50px',
      top: 0,
    },
    indicator: {
      position: 'absolute',
      top: 0,
      left: '40px',
    },
    text: {
      color: '#002f6c',
      display: 'inline-block',
      fontSize: '1rem',
      marginLeft: '0.25rem',
      fontWeight: 'bold',
      textAlign: 'right',
    },
  },
  opponentTeamRank: {
    image: {
      position: 'relative',
      left: '-50px',
      top: 0,
    },
    indicator: {
      position: 'absolute',
      top: 0,
      left: '0px',
    },
    text: {
      color: '#002f6c',
      display: 'inline-block',
      fontSize: '1rem',
      marginLeft: '0.25rem',
      fontWeight: 'bold',
      textAlign: 'right',
      transform: 'translate(130px, 0)',
    },
  },
  noStickOpponentTeamRank: {
    indicator: {
      position: 'absolute',
      top: 0,
      left: '0px',
    },
    text: {
      color: 'white',
      display: 'inline-block',
      fontSize: '1rem',
      marginLeft: '0.25rem',
      fontWeight: 'bold',
      textAlign: 'right',
      transform: 'translate(130px, 0)',
    },
  },
};

const levelTypes = (type) => ({
  budget: {
    image: budget,
    indicator: (
      <div style={styles[type].indicator}>
        <Indicator amount={25} direction='left' />
        <span style={styles[type].text}>
          Spending <br />
          Budget
        </span>
      </div>
    ),
  },
  teamRank: {
    image: teamRank,
    indicator: (
      <div style={styles[type].indicator}>
        <span style={styles[type].text}>
          Team <br />
          Rank
        </span>
        <Indicator amount={25} direction='right' />
      </div>
    ),
  },
  opponentTeamRank: {
    image: budget,
    indicator: (
      <div style={styles[type].indicator}>
        <span style={styles[type].text}>
          Team <br />
          Rank
        </span>
        <Indicator amount={25} direction='left' />
      </div>
    ),
  },
  noStickOpponentTeamRank: {
    image: null,
    indicator: (
      <div style={styles[type].indicator}>
        <span style={styles[type].text}>
          Team <br />
          Rank
        </span>
        <Indicator amount={25} direction='left' />
      </div>
    ),
  },
});

export const LevelStick = ({ type }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '190px',
        height: '225px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ReactSVG style={styles[type].image} src={levelTypes(type)[type].image} />
      {levelTypes(type)[type].indicator}
    </div>
  );
};
