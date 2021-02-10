import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  PlayerDropContainer,
  PlayerDragItem,
  HeaderComponent,
} from '@components';
import scoutStick from '@images/scout-stick.svg';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Tutorial, scoutSlides } from '@tutorial';
import { setTutorialIsActive } from '@redux/actions';
import { Link } from 'react-router-dom';
import '@css/pages/ScoutPage.css';
import { PageBoard } from './../components/PageBoard';

const teamSlides = [scoutSlides];

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

const oneDollar = [
  {
    name: 'Kacy Sommers',
  },
  {
    name: 'Savanna Shai',
  },
  {
    name: 'Joni Blue',
  },
];
const twoDollar = [
  {
    name: 'Emmylou Bee',
  },
  {
    name: 'Roger Rogers',
  },
  {
    name: 'Andrew Andrews',
  },
];
const fiftyCents = [
  {
    name: 'Steve Stevens',
  },
  {
    name: 'Robert Roberts',
  },
  {
    name: 'PJ Peters',
  },
];

const players = [...oneDollar, ...twoDollar, ...fiftyCents];

const TeamPage = () => {
  // GET TEAM FROM STORE

  const newPlayersAnimationState = useSelector(
    (state) => state.tutorial.scout.newPlayersBoard
  );

  const moneyLevelAnimationStates = {
    0: useSelector((state) => state.tutorial.scout.moneyLevel1),
    1: useSelector((state) => state.tutorial.scout.moneyLevel2),
    2: useSelector((state) => state.tutorial.scout.moneyLevel3),
  };

  const finishedBtnAnimationState = useSelector(
    (state) => state.tutorial.scout.finishedBtn
  );

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  const onDragStart = (e) => {
    console.log('DRAG START:::: ', e);
  };

  const onDragEnd = (e) => {
    console.log('DRAG END:::: ', e);
  };

  const getDragItem = (player, key) => {
    return (
      <div className='player-card-drop'>
        <Droppable key={`${key}-droppable`} droppableId={`${key}-droppable`}>
          {(dropProvided) => (
            <PlayerDropContainer
              provided={dropProvided}
              innerRef={dropProvided.innerRef}
              player={player}
            >
              <Draggable
                key={`${key}-draggable`}
                draggableId={`${key}-draggable`}
                index={0}
              >
                {(dragProvided) => (
                  <PlayerDragItem
                    provided={dragProvided}
                    innerRef={dragProvided.innerRef}
                    player={player}
                  ></PlayerDragItem>
                )}
              </Draggable>
              {/* {dropProvided.placeholder} */}
            </PlayerDropContainer>
          )}
        </Droppable>
      </div>
    );
  };

  let newPlayerRowIndex = 0;
  const newPlayerRows = players
    .reduce((rows, player, i) => {
      const p = getDragItem(player, `new-player-${i}`);
      if (rows[newPlayerRowIndex]) {
        rows[newPlayerRowIndex].push(p);
      } else {
        rows.push([p]);
      }
      if ((i + 1) % 3 === 0) {
        newPlayerRowIndex++;
      }
      return rows;
    }, [])
    .map((row, i) => (
      <div className='new-player-row'>{row.map((p, j) => p)}</div>
    ));

  let contractPlayerRowIndex = 0;
  const contractPlayerRows = players
    .reduce((rows, player, i) => {
      const p = getDragItem(player, `contract-player-${i}`);
      if (rows[contractPlayerRowIndex]) {
        rows[contractPlayerRowIndex].push(p);
      } else {
        rows.push([p]);
      }

      if (
        (contractPlayerRowIndex === 0 && i === 1) ||
        (contractPlayerRowIndex === 1 && i === 4)
      ) {
        contractPlayerRowIndex++;
      }

      return rows;
    }, [])
    .map((row, i) => (
      <div className='contract-player-row-wrap'>
        <span
          className={`color-primary money-level-indicator box-shadow${
            tutorialActive ? ' hidden' : ''
          }`}
        >
          {moneyLevels[i].short}
        </span>
        <p className='money-level-text'>
          These players get a {moneyLevels[i].long} contract
        </p>
        <motion.div
          className='contract-player-row card auto-card'
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
              Give each new player a contract value by dragging them to their
              money level!
            </p>
          </div>

          <div className='scout-page-board-inner'>
            <div className='scout-page-board-left'>
              {tutorialActive ? (
                <motion.div
                  className='card auto-card scout-board'
                  animate={newPlayersAnimationState}
                  transition={{ default: { duration: 1 } }}
                >
                  {newPlayerRows}
                </motion.div>
              ) : (
                <div className='card auto-card scout-board'>
                  {newPlayerRows}
                </div>
              )}
            </div>

            <div className='scout-page-board-right'>{contractPlayerRows}</div>
          </div>

          <div className='scout-page-board-footer'>
            <p className='color-primary'>
              Remember to tap a player to learn more about them!
            </p>
            <motion.div
              className='color-primary finished-btn'
              animate={finishedBtnAnimationState}
            >
              <Link className='text-link' link='/sign'>
                <span>Click here when you finish!</span>
                <div className='check-btn-small'></div>
              </Link>
            </motion.div>
          </div>
        </PageBoard>
        <AnimatePresence>
          {tutorialActive && (
            <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Tutorial slides={teamSlides} onComplete={onTutorialComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DragDropContext>
  );
};

export default TeamPage;
