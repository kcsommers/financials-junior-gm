import { useCallback, useEffect, useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  PlayerDropContainer,
  PlayerDragItem,
  HeaderComponent,
  PlayerCard,
  Overlay,
  PlayerDetailsOverlay,
  BadScoutOverlay,
  FaqOverlay,
  NextSeasonOverlay,
  OverlayBoard,
  Button,
  PageBoard,
} from '@components';
import { batch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  scoutSlides,
  SharkieButton,
  Tutorial,
  getConfirmSlides,
} from '@tutorial';
import {
  setTutorialIsActive,
  updateScoutPlayer,
  toggleOverlay,
  setStudent,
  scoutingComplete,
  useAppSelector,
  useAppDispatch,
} from '@redux';
import { isEqual } from 'lodash';
import { getMoneyLevels } from '@utils';
import { cloneDeep } from 'lodash';
import { PlayerAssignments } from '@data/players/players';
import { faqs } from '@data/faqs/faqs';
import '@css/pages/ScoutPage.css';
import { BASE_URL } from 'app/api';
import { ApiHelper } from '@statrookie/core';

const boardMap = {
  available: {},
  levelOne: {},
  levelTwo: {},
  levelThree: {},
};

export const ScoutPage = ({ history }) => {
  const dispatch = useAppDispatch();
  const tutorialActive = useAppSelector((state) => state.tutorial.isActive);
  const student = useAppSelector((state) => state.studentState.student);
  const { inTransition, awards, inSession } = useAppSelector(
    (state) => state.season
  );
  const { scoutingState } = useAppSelector((state) => state.players);
  const { scoutPlayers } = scoutingState;
  const availablePlayersAnimationState = useAppSelector(
    (state) => state.tutorial.scout.availablePlayersBoard
  );
  const offeredPlayersAnimationState = useAppSelector(
    (state) => state.tutorial.scout.offeredPlayersBoard
  );
  const finishedBtnAnimationState = useAppSelector(
    (state) => state.tutorial.scout.finishedBtn
  );

  const moneyLevelOneState = useAppSelector(
    (state) => state.tutorial.scout.moneyLevel1
  );
  const moneyLevelTwoState = useAppSelector(
    (state) => state.tutorial.scout.moneyLevel2
  );
  const moneyLevelThreeState = useAppSelector(
    (state) => state.tutorial.scout.moneyLevel3
  );

  const [availablePlayersBoard, setAvailablePlayersBoard] = useState([]);
  const [offeredPlayersBoard, setOfferedPlayersBoard] = useState<any[]>([]);
  const [tutorialSlides, setTutorialSlides] = useState([scoutSlides]);

  const onTutorialComplete = (canceled) => {
    if (canceled) {
      setTimeout(() => {
        dispatch(setTutorialIsActive(false));
      }, 1000);
      return;
    }

    // check if this was the first time the tutorial was viewed
    if (!student.tutorials || !student.tutorials.scout) {
      // if so, update the student object and enable budget button
      const tutorials = { ...(student.tutorials || {}), scout: true };
      ApiHelper.updateStudentById(BASE_URL, student._id, { tutorials })
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

  const showPlayerDetails = useCallback(
    (player) => {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <PlayerDetailsOverlay
              player={player}
              includeActions={false}
              student={student}
            />
          ),
        })
      );
    },
    [dispatch, student]
  );

  const getDroppableItem = useCallback(
    (player, key, small = false) => {
      const level = key.split('-')[0];
      boardMap[level][key] = player;

      const isEmpty = !player && level === 'available';
      const playerCard = !isEmpty ? (
        player ? (
          <Draggable
            key={player.playerName}
            draggableId={player.playerName}
            index={0}
            className="draggable-player"
          >
            {(dragProvided, dragSnapshot) => (
              <div
                style={
                  small && !dragSnapshot.isDragging
                    ? {
                        transform: 'scale(0.85)',
                      }
                    : {}
                }
              >
                <PlayerDragItem
                  provided={dragProvided}
                  innerRef={dragProvided.innerRef}
                  player={player}
                  onClick={showPlayerDetails.bind(this, player)}
                ></PlayerDragItem>
              </div>
            )}
          </Draggable>
        ) : (
          <div style={small ? { transform: 'scale(0.85)' } : {}}>
            <PlayerCard key={`${key}-empty`} />
          </div>
        )
      ) : (
        <div className="empty-player-slot"></div>
      );

      return (
        <div
          key={`${key}-droppable-wrap`}
          className={`player-card-drop${
            small ? ' player-card-drop-small' : ''
          }`}
          style={
            !!player && level !== 'available'
              ? {
                  position: 'relative',
                  top: '-7px',
                }
              : {}
          }
        >
          <Droppable
            key={`${key}-droppable`}
            droppableId={`${key}`}
            isDropDisabled={!!player}
          >
            {(dropProvided, dropSnapshot) => (
              <>
                <PlayerDropContainer
                  provided={dropProvided}
                  innerRef={dropProvided.innerRef}
                  player={player}
                  isDraggingOver={dropSnapshot.isDraggingOver}
                >
                  {playerCard}
                </PlayerDropContainer>
              </>
            )}
          </Droppable>
        </div>
      );
    },
    [showPlayerDetails]
  );

  const getAvailablePlayersBoard = useCallback(
    (_players) => {
      if (!scoutPlayers.available) {
        return;
      }

      const availablePlayers: any[] = [];
      for (let i = 0; i < Math.max(9, scoutPlayers.available.length); i++) {
        availablePlayers.push(getDroppableItem(_players[i], `available-${i}`));
      }

      let availablePlayerRowIndex = 0;
      return availablePlayers
        .reduce((rows, p, i) => {
          if (rows[availablePlayerRowIndex]) {
            rows[availablePlayerRowIndex].push(p);
          } else {
            rows.push([p]);
          }
          if ((i + 1) % 3 === 0) {
            availablePlayerRowIndex++;
          }
          return rows;
        }, [])
        .map((row, j) => (
          <div
            key={`available-player-row-${j}`}
            className="available-player-row"
          >
            {row.map((p) => p)}
          </div>
        ));
    },
    [scoutPlayers.available, getDroppableItem]
  );

  const getOfferedPlayersBoard = useCallback(
    (
      _levelOne,
      _levelTwo,
      _levelThree,
      moneyLevels,
      moneyLevelAnimationStates
    ) => {
      if (!moneyLevels) {
        return;
      }

      const levelOnePlayers: any[] = [];
      const levelTwoPlayers: any[] = [];
      const levelThreePlayers: any[] = [];

      for (let i = 0; i < Math.max(1, scoutPlayers.levelOne.length); i++) {
        levelOnePlayers.push(getDroppableItem(_levelOne[i], `levelOne-${i}`));
      }

      for (let i = 0; i < Math.max(2, scoutPlayers.levelTwo.length); i++) {
        levelTwoPlayers.push(getDroppableItem(_levelTwo[i], `levelTwo-${i}`));
      }

      for (let i = 0; i < Math.max(3, scoutPlayers.levelThree.length); i++) {
        levelThreePlayers.push(
          getDroppableItem(_levelThree[i], `levelThree-${i}`, true)
        );
      }

      const offeredPlayers = [
        levelOnePlayers,
        levelTwoPlayers,
        levelThreePlayers,
      ];
      return offeredPlayers.map((row, i) => (
        <motion.div
          key={`offered-player-row-${i}`}
          className="offered-player-row-wrap"
          animate={moneyLevelAnimationStates[i]}
          transition={{ default: { duration: 1 } }}
        >
          <span className="money-level-short color-primary">
            {moneyLevels[i].short}
          </span>
          <p className={`money-level-text money-level-text-${i}`}>
            These players get a {moneyLevels[i].long} contract offered
          </p>
          <div className="offered-player-row">
            <div className={`offered-player-row-inner level-${i + 1}`}>
              {row.map((p) => p)}
            </div>
          </div>
        </motion.div>
      ));
    },
    [scoutPlayers, getDroppableItem]
  );

  const onPlayerDropped = (e) => {
    // find the dropped player in the board map
    if (!e.destination || !e.source) {
      return;
    }

    const updateBoard = () => {
      // update the map where the player was dropped
      boardMap[dropLevel][e.destination.droppableId] = droppedPlayer;

      // update the slot the player was moved from
      boardMap[sourceLevel][e.source.droppableId] = null;

      // update scouting state
      dispatch(
        updateScoutPlayer({
          [dropLevel]: Object.keys(boardMap[dropLevel]).map(
            (k) => boardMap[dropLevel][k]
          ),
          [sourceLevel]: Object.keys(boardMap[sourceLevel]).map(
            (k) => boardMap[sourceLevel][k]
          ),
        })
      );
    };

    const dropLevel = e.destination.droppableId.split('-')[0];
    const sourceLevel = e.source.droppableId.split('-')[0];
    const droppedPlayer = boardMap[sourceLevel][e.source.droppableId];

    const levelThreeMaxRank =
      +student.level === 1 ? 15 : +student.level === 2 ? 45 : 75;

    const levelOneMinRank =
      +student.level === 1 ? 5 : +student.level === 2 ? 35 : 65;

    if (
      dropLevel === 'levelThree' &&
      droppedPlayer.overallRank >= levelThreeMaxRank
    ) {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <BadScoutOverlay
              message1="The contract you are offering this player is not high enough!"
              message2="Try putting them in a higher level to offer them more money."
              buttonText="Try Again"
            />
          ),
        })
      );
      return;
    }

    if (
      dropLevel === 'levelOne' &&
      droppedPlayer.overallRank <= levelOneMinRank
    ) {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <BadScoutOverlay
              message1="Are you sure?"
              message2={`${droppedPlayer.playerName}'s rank is a little low for this contract level. Would you like to continue with this offer?`}
              buttonText="Make Offer"
              onButtonClick={updateBoard.bind(this)}
            />
          ),
        })
      );
      return;
    }

    updateBoard();
  };

  const handleScoutingInvalid = () => {};

  const handleScoutingComplete = () => {
    const moneyLevels = getMoneyLevels(+student.level || 1);

    const levelOneCloned: any[] = cloneDeep(scoutPlayers.levelOne);
    const levelTwoCloned: any[] = cloneDeep(scoutPlayers.levelTwo);
    const levelThreeCloned: any[] = cloneDeep(scoutPlayers.levelThree);
    const offeredScoutPlayers: any[] = [];

    levelOneCloned.forEach((p) => {
      p.playerCost = moneyLevels[0].num;
      p.playerAssignment = PlayerAssignments.OFFERED_SCOUT;
      offeredScoutPlayers.push(p);
    });
    levelTwoCloned.forEach((p) => {
      p.playerCost = moneyLevels[1].num;
      p.playerAssignment = PlayerAssignments.OFFERED_SCOUT;
      offeredScoutPlayers.push(p);
    });
    levelThreeCloned.forEach((p) => {
      p.playerCost = moneyLevels[2].num;
      p.playerAssignment = PlayerAssignments.OFFERED_SCOUT;
      offeredScoutPlayers.push(p);
    });

    const playersUpdated = student.players.map((p) => {
      const offeredScoutIndex = offeredScoutPlayers.findIndex(
        (player) => player._id === p._id
      );
      if (offeredScoutIndex > -1) {
        return offeredScoutPlayers[offeredScoutIndex];
      }
      return p;
    });

    ApiHelper.updateStudentById(BASE_URL, student._id, {
      players: playersUpdated,
    })
      .then((res) => {
        history.push({
          pathname: '/team',
          state: { showScoutingOverlay: true },
        });
        batch(() => {
          dispatch(setStudent(res.updatedStudent));
          dispatch(
            scoutingComplete({
              levelOne: levelOneCloned,
              levelTwo: levelTwoCloned,
              levelThree: levelThreeCloned,
            })
          );
        });
      })
      .catch((err) => console.error(err));
  };

  const validateScouting = () => {
    // check that the available board is empty
    if (scoutingIsValid()) {
      handleScoutingComplete();
    } else {
      handleScoutingInvalid();
    }
  };

  const scoutingIsValid = () => {
    return (
      scoutingState &&
      !scoutingState.isComplete &&
      scoutPlayers.available &&
      scoutPlayers.available.reduce((total, p) => {
        if (p) {
          total++;
        }
        return total;
      }, 0) < 4
    );
  };

  const setBoards = useCallback(
    (available, offered, moneyLevelAnimationStates) => {
      if (!scoutPlayers.available) {
        return;
      }

      if (available) {
        setAvailablePlayersBoard(
          getAvailablePlayersBoard(scoutPlayers.available)
        );
      }
      if (offered) {
        setOfferedPlayersBoard(
          getOfferedPlayersBoard(
            scoutPlayers.levelOne,
            scoutPlayers.levelTwo,
            scoutPlayers.levelThree,
            getMoneyLevels(+student.level || 1),
            moneyLevelAnimationStates
          ) as any
        );
      }
    },
    [student, getAvailablePlayersBoard, getOfferedPlayersBoard, scoutPlayers]
  );

  const onCallSharkie = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: (
          <FaqOverlay
            questions={faqs.scout}
            title="Scout Page FAQs"
            level={+student.level}
            onStartTutorial={() => {
              dispatch(
                toggleOverlay({
                  isOpen: false,
                  template: null,
                })
              );
              startTutorial([getConfirmSlides('scout'), scoutSlides]);
            }}
          />
        ),
      })
    );
  };

  const prevAvailableRef = useRef(null);
  const prevL1Ref = useRef(null);
  const prevL2Ref = useRef(null);
  const prevL3Ref = useRef(null);
  useEffect(() => {
    if (!scoutPlayers.available) {
      return;
    }

    const moneyLevelAnimationStates = [
      moneyLevelOneState,
      moneyLevelTwoState,
      moneyLevelThreeState,
    ];

    const setAvailable = tutorialActive
      ? true
      : !isEqual(scoutPlayers.available, prevAvailableRef.current);

    const setOffered = tutorialActive
      ? true
      : !isEqual(scoutPlayers.levelOne, prevL1Ref.current) ||
        !isEqual(scoutPlayers.levelTwo, prevL2Ref.current) ||
        !isEqual(scoutPlayers.levelThree, prevL3Ref.current);

    setBoards(setAvailable, setOffered, moneyLevelAnimationStates);

    prevAvailableRef.current = scoutPlayers.available;
    prevL1Ref.current = scoutPlayers.levelOne;
    prevL2Ref.current = scoutPlayers.levelTwo;
    prevL3Ref.current = scoutPlayers.levelThree;
  }, [
    setBoards,
    scoutPlayers,
    tutorialActive,
    moneyLevelOneState,
    moneyLevelTwoState,
    moneyLevelThreeState,
  ]);

  const hasSeenTutorial = useRef(
    !!(student && student.tutorials && student.tutorials.scout)
  );
  useEffect(() => {
    if (student && !hasSeenTutorial.current) {
      hasSeenTutorial.current = true;
      startTutorial([scoutSlides]);
    }
  }, [student, startTutorial]);
  hasSeenTutorial.current = !!(
    student &&
    student.tutorials &&
    student.tutorials.scout
  );

  if (inTransition && !inSession) {
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
  } else if (scoutingState.isComplete) {
    window.setTimeout(() => {
      history.push({
        pathname: '/team',
        state: { showScoutingOverlay: true },
      });
    });
  }

  return (
    <div className="page-container scout-page-container">
      <HeaderComponent
        stickBtn="scout"
        largeStick={true}
        level={+student.level}
        tutorialActive={tutorialActive}
        stickBtnLink="/team"
        beforeNav={() => {
          dispatch(
            toggleOverlay({
              isOpen: true,
              template: (
                <OverlayBoard>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      textAlign: 'center',
                      padding: '3rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '2rem',
                        marginBottom: '3rem',
                      }}
                    >
                      Please scout all 6 players before leaving the scout page.
                    </p>
                    <Button
                      text="Keep Scouting"
                      onClick={() => {
                        dispatch(
                          toggleOverlay({
                            isOpen: false,
                            template: null,
                          })
                        );
                      }}
                    />
                  </div>
                </OverlayBoard>
              ),
            })
          );

          return false;
        }}
      />
      <PageBoard height="98%">
        <div className="scout-page-board-header">
          <p className="color-primary scout-page-helper-text">
            Make an offer to a player by dragging them to a contract level!
          </p>
          <div className="scout-page-board-header-inner">
            <SharkieButton onCallSharkie={onCallSharkie} textPosition="right" />
            <motion.div
              className="color-primary"
              animate={finishedBtnAnimationState}
              style={{ transformOrigin: 'right' }}
              transition={{
                default: { duration: 1 },
              }}
            >
              <div
                className={!scoutingIsValid() ? 'disabled' : ''}
                onClick={() => {
                  if (!scoutingState.isComplete) {
                    validateScouting();
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  width: '200px',
                  textAlign: 'right',
                }}
              >
                Click here when you finish!
                <div
                  className="check-btn"
                  style={{ marginLeft: '0.5rem' }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>

        <DragDropContext onDragEnd={onPlayerDropped}>
          <div className="scout-page-board-inner">
            <div className="scout-page-board-left">
              {tutorialActive ? (
                <>
                  <p className="color-primary">
                    Remember to tap a player to learn more about them!
                  </p>
                  <motion.div
                    className="scout-board scout-board-disabled"
                    animate={availablePlayersAnimationState}
                    transition={{ default: { duration: 1 } }}
                    style={{ transformOrigin: 'bottom' }}
                  >
                    {availablePlayersBoard}{' '}
                  </motion.div>
                </>
              ) : (
                <>
                  <p className="color-primary">
                    Remember to tap a player to learn more about them!
                  </p>
                  <div className="scout-board">{availablePlayersBoard}</div>
                </>
              )}
            </div>

            <div className="scout-page-board-right">
              <motion.div
                style={{ position: 'relative', top: '-13px' }}
                animate={offeredPlayersAnimationState}
              >
                {offeredPlayersBoard}
              </motion.div>
            </div>
          </div>
        </DragDropContext>
      </PageBoard>
      <Overlay />
      {tutorialActive && (
        <Tutorial slides={tutorialSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};