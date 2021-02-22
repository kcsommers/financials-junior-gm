import { useState, useRef, useEffect, useCallback } from 'react';
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
  TeamBudgetState,
  NextSeasonOverlay,
} from '@components';
import scoutStick from '@images/scout-stick.svg';
import teamStick from '@images/team-stick.svg';
import iceBgSmall from '@images/ice-bg-small.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  teamSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import { setTutorialState, toggleOverlay, updateStudent } from '@redux/actions';
import { updateStudentById } from './../api-helper';
import { cloneDeep } from 'lodash';
import '@css/pages/TeamPage.css';

export const TeamPage = () => {
  const dispatch = useDispatch();
  const tutorialActive = useSelector((state) => state.tutorial.isActive);
  const student = useSelector((state) => state.studentState.student);
  const team = useSelector((state) => state.players.teamPlayers);
  const seasonState = useSelector((state) => state.season);
  const scoutingState = useSelector((state) => state.players.scoutingState);
  const playerCardAnimationStates = {
    playerCard: useSelector((state) => state.tutorial.team.playerCard),
    playerCardEmpty: useSelector(
      (state) => state.tutorial.team.playerCardEmpty
    ),
    scoutStick: useSelector((state) => state.tutorial.team.scoutStick)
  };

  const [tutorialSlides, setTutorialSlides] = useState([teamSlides]);

  const onTutorialComplete = () => {
    dispatch(setTutorialState({ isActive: false }));
  };

  const startTutorial = useCallback(
    (slides) => {
      setTutorialSlides(slides);
      dispatch(
        setTutorialState({
          isActive: true,
        })
      );
    },
    [dispatch]
  );

  const onCallSharkie = () => {
    startTutorial([getConfirmSlides('team'), teamSlides]);
  };

  const openPlayerDetailsOverlay = (player) => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <PlayerDetailsOverlay
            player={player}
            student={student}
            seasonState={seasonState}
          />
        ),
      })
    );
  };

  const openSignPlayerOverlay = (assignment) => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <SignPlayerOverlay
            team={team}
            assignment={assignment}
            student={student}
          />
        ),
      })
    );
  };

  const hasSeenTutorial = useRef(
    !!(student && student.tutorials && student.tutorials.team)
  );
  useEffect(() => {
    if (student && !hasSeenTutorial.current) {
      hasSeenTutorial.current = true;
      const clonedTutorials = cloneDeep(student.tutorials || {});
      clonedTutorials.team = true;
      updateStudentById(student._id, { tutorials: clonedTutorials })
        .then((res) => {
          dispatch(updateStudent({ tutorials: clonedTutorials }));
          startTutorial([teamSlides]);
        })
        .catch((err) => console.error(err));
    }
  }, [student, dispatch, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.team
  );

  if (seasonState.inTransition) {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <NextSeasonOverlay student={student} awards={seasonState.awards} />
        ),
        canClose: false,
      })
    );
  }

  return (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={teamStick}
        level={student.level}
        tutorialActive={tutorialActive}
      />

      <PageBoard hideCloseBtn={true} includeBackButton={true}>
        <div className='team-page-board-header'>
          <div className='team-page-board-header-inner'>
            <ReactSVG src={jrSharksLogo} />
            <SharkieButton textPosition='left' onCallSharkie={onCallSharkie} />
          </div>
          <h2 className='color-primary'>San Jose Jr. Sharks</h2>
        </div>

        <div className='team-page-board-inner'>
          <div className='team-page-board-left'>
            <TeamBudgetState />
            <div
              style={{
                position: 'absolute',
                left: '-41px',
                bottom: '3rem',
              }}
            >
              <StickButton small={true} image={scoutStick} animationState={playerCardAnimationStates.scoutStick} link='/scout' />
            </div>
          </div>

          <div className='team-page-board-right'>
            <div className='team-players-card'>
              <ReactSVG
                style={{
                  position: 'absolute',
                  top: '25px',
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
                  player={team.fOne}
                  onClick={
                    team.fOne
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'fOne')
                  }
                />
                <div style={{ position: 'relative', top: '15px' }}>
                  <PlayerCard
                    animationStates={playerCardAnimationStates}
                    player={team.fTwo}
                    onClick={
                      team.fTwo
                        ? openPlayerDetailsOverlay
                        : openSignPlayerOverlay.bind(this, 'fTwo')
                    }
                  />
                </div>
                <PlayerCard
                  animationStates={playerCardAnimationStates}
                  player={team.fThree}
                  onClick={
                    team.fThree
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'fThree')
                  }
                />
              </div>
              <div className='team-players-row team-players-row-2'>
                <PlayerCard
                  animationStates={playerCardAnimationStates}
                  player={team.dOne}
                  onClick={
                    team.dOne
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'dOne')
                  }
                />
                <div
                  style={{
                    position: 'relative',
                    top: team.gOne ? '15px' : '30px',
                  }}
                >
                  <PlayerCard
                    animationStates={playerCardAnimationStates}
                    player={team.gOne}
                    onClick={
                      team.gOne
                        ? openPlayerDetailsOverlay
                        : openSignPlayerOverlay.bind(this, 'gOne')
                    }
                  />
                </div>
                <PlayerCard
                  animationStates={playerCardAnimationStates}
                  player={team.dTwo}
                  onClick={
                    team.dTwo
                      ? openPlayerDetailsOverlay
                      : openSignPlayerOverlay.bind(this, 'dTwo')
                  }
                />
              </div>
            </div>

            <div
              className={`bench-players-card${
                !scoutingState.isComplete ? ' disabled' : ''
              }`}
            >
              <p className='color-primary on-the-bench-text'>On the Bench</p>
              {scoutingState.isComplete && (
                <div className='team-players-row team-bench-row'>
                  <PlayerCard
                    player={team.benchOne}
                    onClick={
                      team.benchOne
                        ? openPlayerDetailsOverlay
                        : openSignPlayerOverlay.bind(this, 'benchOne')
                    }
                  />
                  <PlayerCard
                    player={team.benchTwo}
                    onClick={
                      team.benchTwo
                        ? openPlayerDetailsOverlay
                        : openSignPlayerOverlay.bind(this, 'benchTwo')
                    }
                  />
                  <PlayerCard
                    player={team.benchThree}
                    onClick={
                      team.benchThree
                        ? openPlayerDetailsOverlay
                        : openSignPlayerOverlay.bind(this, 'benchThree')
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </PageBoard>
      <Overlay />
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};
