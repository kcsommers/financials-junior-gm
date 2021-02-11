import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  PlayerDropContainer,
  PlayerDragItem,
  HeaderComponent,
  PlayerCard,
} from '@components';
import scoutStick from '@images/scout-stick.svg';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { scoutSlides, SharkieButton, Tutorial } from '@tutorial';
import { Link } from 'react-router-dom';
import { PageBoard } from './../components/PageBoard';
import { setTutorialState, setScoutingState } from '@redux/actions';
import { getScoutablePlayers } from '../dummy-data';
import { isEqual } from 'lodash';
import '@css/pages/ScoutPage.css';

const moneyLevels = {
  0: {
    short: '$1',
    long: 'one dollar',
  },
  1: {
    short: '$2',
    long: 'two dollar',
  },
  2: {
    short: '50\u00a2',
    long: 'fifty cent',
  },
};

const boardMap = {
  available: {},
  levelOne: {},
  levelTwo: {},
  levelThree: {},
};

const ScoutPage = () => {
  const [availablePlayersBoard, setAvailablePlayersBoard] = useState([]);
  const [offeredPlayersBoard, setOfferedPlayersBoard] = useState([]);

  const availablePlayersAnimationState = useSelector(
    (state) => state.tutorial.scout.availablePlayersBoard
  );

  const finishedBtnAnimationState = useSelector(
    (state) => state.tutorial.scout.finishedBtn
  );

  const moneyLevelAnimationStates = useMemo(() => ({}), []);
  moneyLevelAnimationStates[0] = useSelector(
    (state) => state.tutorial.scout.moneyLevel1
  );
  moneyLevelAnimationStates[1] = useSelector(
    (state) => state.tutorial.scout.moneyLevel2
  );
  moneyLevelAnimationStates[2] = useSelector(
    (state) => state.tutorial.scout.moneyLevel3
  );

  const tutorialActive = useSelector((state) => state.tutorial.isActive);
  const dispatch = useDispatch();

  const scoutingState = useSelector((state) => state.scouting);

  // Local methods
  const onTutorialComplete = () => {
    dispatch(setTutorialState({ isActive: false }));
  };

  const getDroppableItem = (player, key, small = false) => {
    const level = key.split('-')[0];
    boardMap[level][key] = player;

    const isEmpty = !player && level === 'available';
    const playerCard = !isEmpty ? (
      player ? (
        <Draggable
          key={player.playerName}
          draggableId={player.playerName}
          index={0}
          className='draggable-player'
        >
          {(dragProvided, dragSnapshot) => (
            <PlayerDragItem
              provided={dragProvided}
              innerRef={dragProvided.innerRef}
              player={player}
              small={small}
              isDragging={dragSnapshot.isDragging}
            ></PlayerDragItem>
          )}
        </Draggable>
      ) : (
        <PlayerCard key={`${key}-empty`} small={small} />
      )
    ) : (
      <div className='empty-player-slot'></div>
    );

    return (
      <div
        key={`${key}-droppable-wrap`}
        className={`player-card-drop${small ? ' player-card-drop-small' : ''}`}
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
  };

  const getAvailablePlayersBoard = useCallback(
    (_players) => {
      const availablePlayers = [];
      for (let i = 0; i < Math.max(9, scoutingState.available.length); i++) {
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
            className='available-player-row'
          >
            {row.map((p) => p)}
          </div>
        ));
    },
    [scoutingState.available.length]
  );

  const getOfferedPlayersBoard = useCallback(
    (_levelOne, _levelTwo, _levelThree) => {
      const levelOnePlayers = [];
      const levelTwoPlayers = [];
      const levelThreePlayers = [];

      for (let i = 0; i < Math.max(2, scoutingState.levelOne.length); i++) {
        levelOnePlayers.push(getDroppableItem(_levelOne[i], `levelOne-${i}`));
      }

      for (let i = 0; i < Math.max(3, scoutingState.levelTwo.length); i++) {
        levelTwoPlayers.push(getDroppableItem(_levelTwo[i], `levelTwo-${i}`));
      }

      for (let i = 0; i < Math.max(4, scoutingState.levelThree.length); i++) {
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
        <div
          key={`offered-player-row-${i}`}
          className='offered-player-row-wrap'
        >
          <p className={`money-level-text money-level-text-${i}`}>
            These players get a {moneyLevels[i].long} offered
          </p>
          <motion.div
            className='offered-player-row'
            animate={moneyLevelAnimationStates[i]}
          >
            {row.map((p) => p)}
          </motion.div>
        </div>
      ));
    },
    [
      moneyLevelAnimationStates,
      scoutingState.levelOne.length,
      scoutingState.levelTwo.length,
      scoutingState.levelThree.length,
    ]
  );

  const onDragEnd = (e) => {
    // find the dropped player in the board map

    if (!e.destination || !e.source) {
      return;
    }

    const dropLevel = e.destination.droppableId.split('-')[0];
    const sourceLevel = e.source.droppableId.split('-')[0];
    const droppedPlayer = boardMap[sourceLevel][e.source.droppableId];

    // update the map where the player was dropped
    boardMap[dropLevel][e.destination.droppableId] = droppedPlayer;

    // update the slot the player was moved from
    boardMap[sourceLevel][e.source.droppableId] = null;

    // update scouting state
    dispatch(
      setScoutingState({
        [dropLevel]: Object.keys(boardMap[dropLevel]).map(
          (k) => boardMap[dropLevel][k]
        ),
        [sourceLevel]: Object.keys(boardMap[sourceLevel]).map(
          (k) => boardMap[sourceLevel][k]
        ),
      })
    );
  };

  // ComponentDidMount
  const prevAvailableRef = useRef([]);
  const prevL1Ref = useRef([]);
  const prevL2Ref = useRef([]);
  const prevL3Ref = useRef([]);
  useEffect(() => {
    if (scoutingState.initialized) {
      if (!isEqual(scoutingState.available, prevAvailableRef.current)) {
        setAvailablePlayersBoard(
          getAvailablePlayersBoard(scoutingState.available)
        );
      }
      if (
        !isEqual(scoutingState.levelOne, prevL1Ref.current) ||
        !isEqual(scoutingState.levelTwo, prevL2Ref.current) ||
        !isEqual(scoutingState.levelThree, prevL3Ref.current)
      ) {
        setOfferedPlayersBoard(
          getOfferedPlayersBoard(
            scoutingState.levelOne,
            scoutingState.levelTwo,
            scoutingState.levelThree
          )
        );
      }

      prevAvailableRef.current = scoutingState.available;
      prevL1Ref.current = scoutingState.levelOne;
      prevL2Ref.current = scoutingState.levelTwo;
      prevL3Ref.current = scoutingState.levelThree;
      return;
    }

    getScoutablePlayers()
      .then((_players) => {
        setAvailablePlayersBoard(getAvailablePlayersBoard(_players));
        setOfferedPlayersBoard(getOfferedPlayersBoard([], [], []));
        dispatch(
          setScoutingState({
            levelOne: [],
            levelTwo: [],
            levelThree: [],
            available: _players,
            initialized: true,
          })
        );
      })
      .catch((err) => console.error(err));
  }, [
    dispatch,
    getAvailablePlayersBoard,
    getOfferedPlayersBoard,
    scoutingState.initialized,
    scoutingState.available,
    scoutingState.levelOne,
    scoutingState.levelTwo,
    scoutingState.levelThree,
  ]);

  return (
    <div className='page-container scout-page-container'>
      <HeaderComponent
        stickBtn={scoutStick}
        largeStick={true}
        objectives={['1. Scout players to sign to your bench!']}
      />
      <PageBoard hideCloseBtn={true}>
        <div className='scout-page-board-header'>
          <p className='color-primary scout-page-helper-text'>
            Give each new player a offered value by dragging them to their money
            level!
          </p>
          <span
            style={{ position: 'absolute', right: '0.5rem', top: '0.25rem' }}
          >
            <SharkieButton tutorialSlides={[scoutSlides]} textPosition='left' />
          </span>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className='scout-page-board-inner'>
            <div className='scout-page-board-left'>
              {tutorialActive ? (
                <motion.div
                  className='scout-board'
                  animate={availablePlayersAnimationState}
                  transition={{ default: { duration: 1 } }}
                >
                  {availablePlayersBoard}
                </motion.div>
              ) : (
                <div className='scout-board'>{availablePlayersBoard}</div>
              )}
            </div>

            <div className='scout-page-board-right'>
              <div style={{ position: 'relative', top: '-13px' }}>
                {offeredPlayersBoard}
              </div>
            </div>
          </div>
        </DragDropContext>
        <div className='scout-page-board-footer'>
          <p className='color-primary'>
            Remember to tap a player to learn more about them!
          </p>
          <motion.div
            className='color-primary finished-btn'
            animate={finishedBtnAnimationState}
          >
            <Link className='text-link' to='/sign'>
              <span>Click here when you finish!</span>
              <div className='check-btn-small'></div>
            </Link>
          </motion.div>
        </div>
      </PageBoard>
      {tutorialActive && (
        <Tutorial slides={[scoutSlides]} onComplete={onTutorialComplete} />
      )}
    </div>
  );
};

export default ScoutPage;
