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
  FooterComponent,
} from '@components';
import iceBgSmall from '@images/ice-bg-small.svg';
import { batch } from 'react-redux';
import {
  teamSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
  finishedScoutingSlides,
} from '@tutorial';
import {
  setTutorialIsActive,
  toggleOverlay,
  setStudent,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import { updateStudentById } from '../../api-helper';
import { faqs } from '@data/faqs/faqs';
import { cloneDeep } from 'lodash';
import { PlayerPositions } from '@data/players/players';
import { motion } from 'framer-motion';
import '@css/pages/TeamPage.css';

export const TeamPage = ({ history, location }) => {
  const dispatch = useAppDispatch();
  const tutorialActive = useAppSelector((state) => state.tutorial.isActive);
  const student = useAppSelector((state) => state.studentState.student);
  const team = useAppSelector((state) => state.players.teamPlayers);
  const seasonState = useAppSelector((state) => state.season);
  const studentTeam = seasonState.seasonTeam;
  const scoutingState = useAppSelector((state) => state.players.scoutingState);
  const animationStates = {
    playerCard: useAppSelector((state) => state.tutorial.team.playerCard),
    [PlayerPositions.FORWARD]: useAppSelector(
      (state) => state.tutorial.team[PlayerPositions.FORWARD]
    ),
    [PlayerPositions.DEFENSE]: useAppSelector(
      (state) => state.tutorial.team[PlayerPositions.DEFENSE]
    ),
    [PlayerPositions.GOALIE]: useAppSelector(
      (state) => state.tutorial.team[PlayerPositions.GOALIE]
    ),
    scoutStick: useAppSelector((state) => state.tutorial.team.scoutStick),
    teamBoard: useAppSelector((state) => state.tutorial.team.teamBoard),
  };

  const [tutorialSlides, setTutorialSlides] = useState([teamSlides]);

  const onTutorialComplete = (canceled) => {
    if (canceled) {
      dispatch(setTutorialIsActive(false));
      return;
    }

    // check if this was the first time the tutorial was viewed
    if (!student.tutorials || !student.tutorials.team) {
      // if so, update the student object and enable budget button
      const tutorials = { home: true, budget: true, team: true };
      updateStudentById(student._id, { tutorials })
        .then(({ updatedStudent }) => {
          batch(() => {
            dispatch(setTutorialIsActive(false));
            dispatch(setStudent(updatedStudent));
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(setTutorialIsActive(false));
    }
  };

  const startTutorial = useCallback(
    (slides) => {
      setTutorialSlides(slides);
      dispatch(setTutorialIsActive(true));
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
            title="Team Page FAQs"
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
            assignment={assignment}
            isDisabled={tutorialActive}
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
          onClose: () => {
            if (!student.tutorials || !student.tutorials.season) {
              startTutorial([finishedScoutingSlides]);
            }
          },
        })
      );

      const stateCopy = cloneDeep(location.state);
      delete stateCopy.showScoutingOverlay;
      history.replace({ state: stateCopy });
    }
  }, [dispatch, history, location.state, startTutorial, student.tutorials]);

  if (seasonState.inTransition && !seasonState.inSession) {
    window.setTimeout(() => {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <NextSeasonOverlay
              student={student}
              next={(levelChange) => {
                history.push({ pathname: '/home', state: { levelChange } });
              }}
              finished={(gameFinished) => {
                history.push({ pathname: '/home', state: { gameFinished } });
              }}
            />
          ),
          canClose: false,
        })
      );
    });
  }

  return (
    <div className="page-container">
      <HeaderComponent
        stickBtn="team"
        level={+student.level}
        tutorialActive={tutorialActive}
      />

      <PageBoard>
        <div className="team-page-board-header">
          <div className="team-page-board-header-inner">
            <img
              src={studentTeam.logo}
              alt={studentTeam.name + ' logo'}
              style={{
                display: 'inline-block',
                width: '85px',
              }}
            />
            <SharkieButton textPosition="left" onCallSharkie={onCallSharkie} />
          </div>
          <h2 className="color-primary">{studentTeam.nameFull}</h2>
        </div>

        <div className="team-page-board-inner">
          <div className="team-page-board-left">
            <TeamBudgetState
              tutorialState={
                tutorialActive ? { teamRank: 0, budget: 15 } : null
              }
            />
            <div
              style={{
                position: 'absolute',
                left: '-41px',
                bottom: '1rem',
              }}
            >
              <StickButton
                small={true}
                stick="scout"
                link="/scout"
                isDisabled={scoutingState.isComplete}
              />
            </div>
          </div>

          <div className="team-page-board-right">
            <motion.div
              className="team-players-card"
              animate={animationStates.teamBoard}
              transition={{ default: { duration: 1 } }}
            >
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
                alt="Ice Background"
              />
              <div className="team-players-row">
                {['fOne', 'fTwo', 'fThree'].map((assignment, i) => (
                  <div
                    key={assignment}
                    style={{
                      position: 'relative',
                      top: i === 1 ? '15px' : '0px',
                    }}
                  >
                    <PlayerCard
                      animationStates={animationStates}
                      player={!tutorialActive ? team[assignment] : null}
                      slotPosition={PlayerPositions.FORWARD}
                      onClick={
                        team[assignment]
                          ? openPlayerDetailsOverlay
                          : openSignPlayerOverlay.bind(this, assignment)
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="team-players-row team-players-row-2">
                {['dOne', 'gOne', 'dTwo'].map((assignment, i) => (
                  <div
                    key={assignment}
                    style={{
                      position: 'relative',
                      top: i === 1 ? '15px' : '0px',
                    }}
                  >
                    <PlayerCard
                      animationStates={animationStates}
                      player={!tutorialActive ? team[assignment] : null}
                      slotPosition={
                        assignment === 'gOne'
                          ? PlayerPositions.GOALIE
                          : PlayerPositions.DEFENSE
                      }
                      onClick={
                        team[assignment]
                          ? openPlayerDetailsOverlay
                          : openSignPlayerOverlay.bind(this, assignment)
                      }
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </PageBoard>
      <FooterComponent
        links={['season', 'budget', 'trophies']}
        history={history}
        tutorialActive={tutorialActive}
        student={student}
      />
      <Overlay />
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};
