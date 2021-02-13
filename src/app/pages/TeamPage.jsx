import { useEffect, useState, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import {
  StickButton,
  PlayerCard,
  PageBoard,
  Overlay,
  HeaderComponent,
  PlayerDetailsOverlay,
  SignPlayerOverlay,
} from '@components';
import scoutStick from '@images/scout-stick.svg';
import teamStick from '@images/team-stick.svg';
import iceBgSmall from '@images/ice-bg-small.svg';
import { useSelector, useDispatch } from 'react-redux';
import { playersSlides, SharkieButton, Tutorial } from '@tutorial';
import { LevelStick } from '../components/LevelStick';
import { setTutorialState, toggleOverlay } from '@redux/actions';
import { isEqual } from 'lodash';
import { getPlayerProps } from '@utils';
import '@css/pages/TeamPage.css';

const teamSlides = [playersSlides];

const initialBoardMap = {
  fOne: null,
  fTwo: null,
  fThree: null,
  dOne: null,
  dTwo: null,
  gOne: null,
  benchOne: null,
  benchTwo: null,
  benchThree: null,
};

const getBoardMap = (student) => {
  const map = {};
  getPlayerProps().forEach((p) => {
    map[p] = student[p];
  });
  return map;
};

const TeamPage = () => {
  const student = useSelector((state) => state.studentState.student);
  const studentRef = useRef(null);
  useEffect(() => {
    if (student && !isEqual(student, studentRef.current)) {
      studentRef.current = student;
      setBoardMap(getBoardMap(student));
      console.log('sTUDTEN:::: ', boardMap, student);
    }
  }, [student]);

  const dispatch = useDispatch();
  const tutorialActive = useSelector((state) => state.tutorial.isActive);
  const [boardMap, setBoardMap] = useState(initialBoardMap);

  const playerCardAnimationStates = {
    playerCard: useSelector((state) => state.tutorial.team.playerCard),
    playerCardEmpty: useSelector(
      (state) => state.tutorial.team.playerCardEmpty
    ),
  };

  const onTutorialComplete = () => {
    dispatch(setTutorialState({ isActive: false }));
  };

  const openPlayerDetailsOverlay = (player) => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <PlayerDetailsOverlay player={player} />,
      })
    );
  };

  const openSignPlayerOverlay = (position) => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: <SignPlayerOverlay student={student} position={position} />,
      })
    );
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
                  player={boardMap.fOne}
                  onClick={
                    boardMap.fOne
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'fOne')
                  }
                />
                <div style={{ position: 'relative', top: '15px' }}>
                  <PlayerCard
                    animationStates={playerCardAnimationStates}
                    player={boardMap.fTwo}
                    onClick={
                      boardMap.fTwo
                        ? openPlayerDetailsOverlay
                        : openSignPlayerOverlay.bind(this, 'fTwo')
                    }
                  />
                </div>
                <PlayerCard
                  animationStates={playerCardAnimationStates}
                  player={boardMap.fThree}
                  onClick={
                    boardMap.fThree
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'fThree')
                  }
                />
              </div>
              <div className='team-players-row team-players-row-2'>
                <PlayerCard
                  animationStates={playerCardAnimationStates}
                  player={boardMap.dOne}
                  onClick={
                    boardMap.dOne
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'dOne')
                  }
                />
                <div style={{ position: 'relative', top: '30px' }}>
                  <PlayerCard
                    animationStates={playerCardAnimationStates}
                    player={boardMap.gOne}
                    onClick={
                      boardMap.gOne
                        ? openPlayerDetailsOverlay
                        : openSignPlayerOverlay.bind(this, 'gOne')
                    }
                  />
                </div>
                <PlayerCard
                  animationStates={playerCardAnimationStates}
                  player={boardMap.dTwo}
                  onClick={
                    boardMap.dTwo
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'dTwo')
                  }
                />
              </div>
            </div>

            <div className='bench-players-card'>
              <p className='color-primary on-the-bench-text'>On the Bench</p>
              <div className='team-players-row team-bench-row'>
                <PlayerCard
                  player={boardMap.benchOne}
                  onClick={
                    boardMap.benchOne
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'benchOne')
                  }
                />
                <PlayerCard
                  player={boardMap.benchTwo}
                  onClick={
                    boardMap.benchTwo
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'benchTwo')
                  }
                />
                <PlayerCard
                  player={boardMap.benchThree}
                  onClick={
                    boardMap.benchThree
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'benchThree')
                  }
                />
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
};

export default TeamPage;
