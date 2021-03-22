import { useState, useRef, useEffect, useCallback } from 'react';
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
  FaqOverlay,
  ScoutingCompleteOverlay,
} from '@components';
import scoutStick from '@images/scout-stick.svg';
import teamStick from '@images/team-stick.svg';
import iceBgSmall from '@images/ice-bg-small.svg';
import { useSelector, useDispatch, batch } from 'react-redux';
import {
  teamSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import { setTutorialState, toggleOverlay, setStudent } from '@redux/actions';
import { updateStudentById } from './../api-helper';
import { faqs } from '@data/faqs/faqs';
import { cloneDeep } from 'lodash';
import '@css/pages/TeamPage.css';

export const TeamPage = ({ history, location }) => {
  const dispatch = useDispatch();
  const tutorialActive = useSelector((state) => state.tutorial.isActive);
  const student = useSelector((state) => state.studentState.student);
  const team = useSelector((state) => state.players.teamPlayers);
  const seasonState = useSelector((state) => state.season);
  const studentTeam = seasonState.seasonTeam;
  const scoutingState = useSelector((state) => state.players.scoutingState);
  const playerCardAnimationStates = {
    playerCard: useSelector((state) => state.tutorial.team.playerCard),
    playerCardEmpty: useSelector(
      (state) => state.tutorial.team.playerCardEmpty
    ),
    scoutStick: useSelector((state) => state.tutorial.team.scoutStick),
  };

  const [tutorialSlides, setTutorialSlides] = useState([teamSlides]);

  const onTutorialComplete = (canceled) => {
    if (canceled) {
      dispatch(setTutorialState({ isActive: false }));
      return;
    }

    // check if this was the first time the tutorial was viewed
    if (!student.tutorials || !student.tutorials.team) {
      // if so, update the student object and enable budget button
      const tutorials = { home: true, budget: true, team: true };
      updateStudentById(student._id, { tutorials })
        .then(({ updatedStudent }) => {
          batch(() => {
            dispatch(setTutorialState({ isActive: false }));
            dispatch(setStudent(updatedStudent));
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(setTutorialState({ isActive: false }));
    }
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
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <FaqOverlay
            questions={faqs.team}
            title='Team Page FAQs'
            level={+student.level}
            onStartTutorial={() => {
              dispatch(
                toggleOverlay({
                  isOpen: false,
                  template: null,
                })
              );
              startTutorial([getConfirmSlides('team'), teamSlides]);
            }}
          />
        ),
      })
    );
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
            isDisabled={tutorialActive}
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
            isDisabled={tutorialActive}
            currentScenario={seasonState.currentScenario}
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
      startTutorial([teamSlides]);
    }
  }, [student, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.team
  );

  useEffect(() => {
    if (location.state && location.state.showScoutingOverlay) {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: <ScoutingCompleteOverlay />,
        })
      );

      const stateCopy = cloneDeep(location.state);
      delete stateCopy.showScoutingOverlay;
      history.replace({ state: stateCopy });
    }
  }, [dispatch, history, location.state]);

  if (seasonState.inTransition && !seasonState.inSession) {
    window.setTimeout(() => {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <NextSeasonOverlay
              student={student}
              awards={seasonState.awards}
              next={(levelChange) => {
                history.push({ pathname: '/home', state: { levelChange } });
              }}
            />
          ),
          canClose: false,
        })
      );
    });
  }

  return (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={teamStick}
        level={+student.level}
        tutorialActive={tutorialActive}
      />

      <PageBoard>
        <div className='team-page-board-header'>
          <div className='team-page-board-header-inner'>
            <img
              src={studentTeam.logo}
              alt={studentTeam.name + ' logo'}
              style={{
                display: 'inline-block',
                width: '85px',
              }}
            />
            <SharkieButton textPosition='left' onCallSharkie={onCallSharkie} />
          </div>
          <h2 className='color-primary'>{studentTeam.nameFull}</h2>
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
              <StickButton
                small={true}
                image={scoutStick}
                animationState={playerCardAnimationStates.scoutStick}
                link='/scout'
                isDisabled={scoutingState.isComplete}
              />
            </div>
          </div>

          <div className='team-page-board-right'>
            <div className='team-players-card'>
              <img
                style={{
                  display: 'inline-block',
                  position: 'absolute',
                  top: '25px',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  zIndex: 0,
                }}
                src={iceBgSmall}
                alt='Ice Background'
              />
              <div className='team-players-row'>
                {['fOne', 'fTwo', 'fThree'].map((assignment, i) => (
                  <div
                    key={assignment}
                    style={{
                      position: 'relative',
                      top: i === 1 ? '15px' : '0px',
                    }}
                  >
                    <PlayerCard
                      animationStates={playerCardAnimationStates}
                      player={team[assignment]}
                      onClick={
                        team[assignment]
                          ? openPlayerDetailsOverlay
                          : openSignPlayerOverlay.bind(this, assignment)
                      }
                    />
                  </div>
                ))}
              </div>
              <div className='team-players-row team-players-row-2'>
                {['dOne', 'gOne', 'dTwo'].map((assignment, i) => (
                  <div
                    key={assignment}
                    style={{
                      position: 'relative',
                      top: i === 1 ? '15px' : '0px',
                    }}
                  >
                    <PlayerCard
                      animationStates={playerCardAnimationStates}
                      player={team[assignment]}
                      onClick={
                        team[assignment]
                          ? openPlayerDetailsOverlay
                          : openSignPlayerOverlay.bind(this, assignment)
                      }
                    />
                  </div>
                ))}
              </div>
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
