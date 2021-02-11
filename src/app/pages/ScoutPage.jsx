import { useEffect, useState } from 'react';
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
import '@css/pages/ScoutPage.css';
import { getScoutablePlayers } from '../dummy-data';

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

const ScoutPage = () => {
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const { available, levelOne, levelTwo, levelThree } = useSelector(
    (state) => state.scouting
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getScoutablePlayers()
      .then((_players) => {
        dispatch(
          setScoutingState({
            levelOne: [],
            levelTwo: [],
            levelThree: [],
            available: _players,
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const onTutorialComplete = () => {
    dispatch(setTutorialState({ isActive: false }));
  };

  const availablePlayersAnimationState = useSelector(
    (state) => state.tutorial.scout.availablePlayersBoard
  );

  const moneyLevelAnimationStates = {
    0: useSelector((state) => state.tutorial.scout.moneyLevel1),
    1: useSelector((state) => state.tutorial.scout.moneyLevel2),
    2: useSelector((state) => state.tutorial.scout.moneyLevel3),
  };

  const finishedBtnAnimationState = useSelector(
    (state) => state.tutorial.scout.finishedBtn
  );

  const onDragStart = (e) => {
    console.log('DRAG START:::: ', e);
  };

  const onDragEnd = (e) => {
    console.log('DRAG END:::: ', e);
  };

  const getDroppableItem = (player, key, small = false) => {
    const playerCard = player ? (
      <Draggable
        key={`${key}-draggable`}
        draggableId={`${key}-draggable`}
        index={0}
        className='draggable-player'
      >
        {(dragProvided) => (
          <PlayerDragItem
            provided={dragProvided}
            innerRef={dragProvided.innerRef}
            player={player}
            small={small}
          ></PlayerDragItem>
        )}
        {/* {dropProvided.placeholder} */}
      </Draggable>
    ) : (
      <PlayerCard key={`${key}-empty`} small={small} />
    );

    return (
      <div
        key={`${key}-droppable-wrap`}
        className={`player-card-drop${small ? ' player-card-drop-small' : ''}`}
      >
        <Droppable key={`${key}-droppable`} droppableId={`${key}-droppable`}>
          {(dropProvided) => (
            <PlayerDropContainer
              provided={dropProvided}
              innerRef={dropProvided.innerRef}
              player={player}
            >
              {playerCard}
            </PlayerDropContainer>
          )}
        </Droppable>
      </div>
    );
  };

  const availablePlayers = [];
  for (let i = 0; i < Math.max(9, available.length); i++) {
    if (available[i]) {
      availablePlayers.push(getDroppableItem(available[i], `available-${i}`));
    } else {
      availablePlayers.push(
        <div key={`available-${i}-empty`} className='empty-player-slot'></div>
      );
    }
  }

  let availablePlayerRowIndex = 0;
  const availablePlayerRows = availablePlayers
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
      <div key={`available-player-row-${j}`} className='available-player-row'>
        {row.map((p) => p)}
      </div>
    ));

  const levelOnePlayers = [];
  const levelTwoPlayers = [];
  const levelThreePlayers = [];

  for (let i = 0; i < Math.max(2, levelOne.length); i++) {
    levelOnePlayers.push(getDroppableItem(levelOne[i], `levelOne-${i}`));
  }

  for (let i = 0; i < Math.max(3, levelTwo.length); i++) {
    levelTwoPlayers.push(getDroppableItem(levelTwo[i], `levelTwo-${i}`));
  }

  for (let i = 0; i < Math.max(4, levelThree.length); i++) {
    levelThreePlayers.push(
      getDroppableItem(levelThree[i], `levelThree-${i}`, true)
    );
  }

  const offeredPlayers = [levelOnePlayers, levelTwoPlayers, levelThreePlayers];
  const offeredPlayerRows = offeredPlayers.map((row, i) => (
    <div key={`offered-player-row-${i}`} className='offered-player-row-wrap'>
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

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className='page-container scout-page-container'>
        <HeaderComponent
          stickBtn={scoutStick}
          largeStick={true}
          objectives={['1. Scout players to sign to your bench!']}
        />
        <PageBoard hideCloseBtn={true}>
          <div className='scout-page-board-header'>
            <p className='color-primary scout-page-helper-text'>
              Give each new player a offered value by dragging them to their
              money level!
            </p>
            <span
              style={{ position: 'absolute', right: '0.5rem', top: '0.25rem' }}
            >
              <SharkieButton
                tutorialSlides={[scoutSlides]}
                textPosition='left'
              />
            </span>
          </div>

          <div className='scout-page-board-inner'>
            <div className='scout-page-board-left'>
              {tutorialActive ? (
                <motion.div
                  className='scout-board'
                  animate={availablePlayersAnimationState}
                  transition={{ default: { duration: 1 } }}
                >
                  {availablePlayerRows}
                </motion.div>
              ) : (
                <div className='scout-board'>{availablePlayerRows}</div>
              )}
            </div>

            <div className='scout-page-board-right'>
              <div style={{ position: 'relative', top: '-13px' }}>
                {offeredPlayerRows}
              </div>
            </div>
          </div>

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
    </DragDropContext>
  );
};

export default ScoutPage;
