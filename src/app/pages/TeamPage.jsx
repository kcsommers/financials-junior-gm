import React from 'react';
import { ReactSVG } from 'react-svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import closeBtn from '@images/icons/cancel.svg';
import '@css/pages/TeamPage.css';
import {
  TeamStick,
  ObjectivesBoard,
  TeamRankStick,
  MoneyLeftStick,
  SignStick,
  ScoutStick,
  PlayerCard,
} from '@components';
import sharksLogo from '@images/sharks-comerica-logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Tutorial, playersSlides } from '@tutorial';
import { Link } from 'react-router-dom';
import { setTutorialIsActive } from '@redux/actions';

const teamSlides = [playersSlides];

function TeamPage() {
  // GET TEAM FROM STORE

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  console.log('TUTORIAL ACTIVE:::: ', tutorialActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  const highlightPlayerCards = useSelector(
    (state) => state.tutorial.team.playerCard.highlight
  );

  return (
    <div className='team-page-container'>
      <div className='team-page-header'>
        <div className='header-logo-wrap'>
          <img src={sharksLogo} alt='Sharks Logo' />
        </div>
        <div className='team-stick-wrap'>
          <TeamStick></TeamStick>
        </div>
        <div className='page-header-objectives-board-wrap'>
          <ObjectivesBoard
            objectivesArray={['1. Learn about your budget.']}
          ></ObjectivesBoard>
        </div>
      </div>
      <div className='team-page-body'>
        <div className='team-page-board'>
          <Link to='/home'>
            <ReactSVG className='team-page-board-close-btn' src={closeBtn} />
          </Link>
          <div className='team-page-board-left'>
            <div className='sticks-card card'>
              <TeamRankStick></TeamRankStick>
              <MoneyLeftStick></MoneyLeftStick>
            </div>
            <div className='team-page-stick-btns-wrap'>
              <div className='team-page-stick-btn-wrap'>
                <SignStick includeSubtext={true} />
              </div>
              <div className='team-page-stick-btn-wrap'>
                <ScoutStick includeSubtext={true} />
              </div>
            </div>
          </div>
          <div className='team-page-board-right'>
            <div className='team-page-board-header'>
              <div className='team-page-board-header-logo-wrap'>
                <ReactSVG src={jrSharksLogo} />
              </div>
              <h3 className='team-page-board-title color-primary outline-black'>
                San Jose Jr Sharks
              </h3>
            </div>
            <div className='team-page-players-container card'>
              <div className='team-page-players-row'>
                <PlayerCard highlight={highlightPlayerCards} />
                <PlayerCard highlight={highlightPlayerCards} />
                <PlayerCard highlight={highlightPlayerCards} />
              </div>
              <div className='team-page-players-row'>
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
              </div>
            </div>
            <div className='team-page-bench-container card'>
              <p className='color-primary on-the-bench-text'>On the Bench</p>
              <div className='team-page-bench-row'>
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
              </div>
            </div>
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
  );
}

export default TeamPage;
