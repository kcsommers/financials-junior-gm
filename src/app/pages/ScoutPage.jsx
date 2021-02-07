import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  ObjectivesBoard,
  ScoutStick,
  MoneyLevel,
  PlayerCard,
  DropContainer,
  DragItem,
} from '@components';
import sharksLogo from '@images/sharks-comerica-logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Tutorial, playersSlides } from '@tutorial';
import { setTutorialIsActive } from '@redux/actions';
import '@css/pages/page.css';
import '@css/pages/ScoutPage.css';

const teamSlides = [playersSlides];

const players = [
  {
    name: 'Kacy Sommers',
  },
  {
    name: 'Savanna Shai',
  },
  {
    name: 'Joni Blue',
  },
  {
    name: 'Emmylou Bee',
  },
  {
    name: 'Roger Rogers',
  },
  {
    name: 'Andrew Andrews',
  },
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

function TeamPage() {
  // GET TEAM FROM STORE

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  let row = 0;
  const playersRows = players
    .reduce((rows, player, i) => {
      console.log('ROWSSS:::: ', i, (i + 1) % 3);
      if (rows[row]) {
        rows[row].push(player);
      } else {
        rows.push([player]);
      }
      if ((i + 1) % 3 === 0) {
        row++;
      }
      return rows;
    }, [])
    .map((row, i) => (
      <Droppable
        key={`droppable-${i}`}
        droppableId={`droppable-${i}`}
        direction='horizontal'
      >
        {(provided) => (
          <DropContainer provided={provided} innerRef={provided.innerRef}>
            <div className='scout-page-players-row'>
              <div className='scout-page-players-row-inner'>
                {row.map((p, j) => (
                  <Draggable
                    key={`draggable-${i}-${j}`}
                    draggableId={`draggable-${i}-${j}`}
                    index={j}
                  >
                    {(provided) => (
                      <DragItem
                        provided={provided}
                        innerRef={provided.innerRef}
                      >
                        <PlayerCard player={p} isDraggable={true} />
                      </DragItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          </DropContainer>
        )}
      </Droppable>
    ));

  return (
    <DragDropContext>
      <div className='page-container'>
        <div className='page-header'>
          <div className='page-header-logo-wrap'>
            <img src={sharksLogo} alt='Sharks Logo' />
          </div>
          <div className='page-header-stick-wrap scout-page-header-stick-wrap'>
            <ScoutStick large={true}></ScoutStick>
          </div>
          <div className='page-header-objectives-board-wrap'>
            <ObjectivesBoard
              objectivesArray={['1. Scout players to sign to your bench!']}
            ></ObjectivesBoard>
          </div>
        </div>
        <div className='page-body'>
          <div className='page-board scout-page-board'>
            <div className='scout-page-board-header'>
              <p className='color-primary'>
                Give each new player a contract value by dragging them to their
                money level!
              </p>
            </div>

            <div className='scout-page-board-inner'>
              <div className='scout-page-board-left'>
                <div className='card auto-card'>{playersRows}</div>
              </div>
              <div className='scout-page-board-right'>
                <div className='card auto-card'>
                  <MoneyLevel level='twoDollars'>
                    <div className='money-level-players-wrap'>
                      <PlayerCard />
                      <PlayerCard />
                    </div>
                  </MoneyLevel>
                  <MoneyLevel level='oneDollar'>
                    <div className='money-level-players-wrap'>
                      <PlayerCard />
                      <PlayerCard />
                    </div>
                  </MoneyLevel>
                  <MoneyLevel level='fiftyCents'>
                    <div className='money-level-players-wrap'>
                      <PlayerCard />
                      <PlayerCard />
                    </div>
                  </MoneyLevel>
                </div>
              </div>
            </div>
            <div className='scout-page-board-footer'>
              <p className='color-primary'>
                Remember to tap a player to learn more about them!
              </p>
              <span className='color-primary'>Click here when you finish!</span>
            </div>
          </div>
        </div>
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
}

export default TeamPage;
