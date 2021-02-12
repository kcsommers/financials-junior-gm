import React from 'react';
import { ReactSVG } from 'react-svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import {
  StickButton,
  PlayerCard,
  PageBoard,
  Overlay,
  HeaderComponent,
} from '@components';
import scoutStick from '@images/scout-stick.svg';
import teamStick from '@images/team-stick.svg';
import iceBgSmall from '@images/ice-bg-small.svg';
import { useSelector, useDispatch } from 'react-redux';
import { playersSlides, SharkieButton, Tutorial } from '@tutorial';
import { LevelStick } from '../components/LevelStick';
import { setTutorialState } from '@redux/actions';
import '@css/pages/TeamPage.css';

const teamSlides = [playersSlides];

function TeamPage() {
  const student = useSelector((state) => state.studentState.student);
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const playerCardAnimationStates = {
    playerCard: useSelector((state) => state.tutorial.team.playerCard),
    playerCardEmpty: useSelector(
      (state) => state.tutorial.team.playerCardEmpty
    ),
  };

  const onTutorialComplete = () => {
    dispatch(setTutorialState({ isActive: false }));
  };

  return student ? (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={teamStick}
        objectives={['1. Learn about your budget.']}
        level={student.level}
      />

      <PageBoard hideCloseBtn={true}>
        <div className='team-page-board-header'>
          <div className='team-page-board-header-inner'>
            <ReactSVG src={jrSharksLogo} />
            <SharkieButton textPosition='left' tutorialSlides={teamSlides} />
          </div>
          <h2 className='color-primary'>San Jose Jr Sharks</h2>
        </div>

        <div className='team-page-board-inner'>
          <div className='team-page-board-left'>
            <div className='level-sticks-card'>
              <div className='level-sticks-card-inner'>
                <LevelStick type='teamRank' />
                <LevelStick type='budget' />
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                left: '-41px',
                bottom: '3rem',
              }}
            >
              <StickButton small={true} image={scoutStick} link='/scout' />
            </div>
          </div>

          <div className='team-page-board-right'>
            <div className='team-players-card'>
              <ReactSVG
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  zIndex: 0,
                }}
                src={iceBgSmall}
              />
              <div className='team-players-row'>
                <PlayerCard
                  animationStates={playerCardAnimationStates}
                  player={{ name: 'KACY' }}
                />
                <div style={{ position: 'relative', top: '15px' }}>
                  <PlayerCard animationStates={playerCardAnimationStates} />
                </div>
                <PlayerCard animationStates={playerCardAnimationStates} />
              </div>
              <div className='team-players-row'>
                <PlayerCard
                  player={{ name: 'KACY' }}
                  animationStates={playerCardAnimationStates}
                />
                <div style={{ position: 'relative', top: '30px' }}>
                  <PlayerCard animationStates={playerCardAnimationStates} />
                </div>
                <PlayerCard animationStates={playerCardAnimationStates} />
              </div>
            </div>

            <div className='bench-players-card'>
              <p className='color-primary on-the-bench-text'>On the Bench</p>
              <div className='team-players-row team-bench-row'>
                <PlayerCard player={{ name: 'KACY' }} />
                <PlayerCard />
                <PlayerCard />
              </div>
            </div>
          </div>
        </div>
      </PageBoard>
      <Overlay />
      {tutorialActive && (
        <Tutorial slides={teamSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default TeamPage;
