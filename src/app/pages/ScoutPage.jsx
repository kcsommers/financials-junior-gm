import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  PlayerDropContainer,
  PlayerDragItem,
  HeaderComponent,
} from '@components';
import scoutStick from '@images/scout-stick.svg';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { scoutSlides, SharkieButton, Tutorial } from '@tutorial';
import { Link } from 'react-router-dom';
import { PageBoard } from './../components/PageBoard';
import { setTutorialState } from '@redux/actions';
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
  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialState({ isActive: false, slides: null, page: null }));
  };

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
        <p className={`money-level-text money-level-text-${i}`}>
          These players get a {moneyLevels[i].long} contract
        </p>
        <motion.div
          className='contract-player-row'
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
                  animate={newPlayersAnimationState}
                  transition={{ default: { duration: 1 } }}
                >
                  {newPlayerRows}
                </motion.div>
              ) : (
                <div className='scout-board'>{newPlayerRows}</div>
              )}
            </div>

            <div className='scout-page-board-right'>
              <div style={{ position: 'relative', top: '-13px' }}>
                {contractPlayerRows}
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
              <Link className='text-link' link='/sign'>
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

export default TeamPage;
