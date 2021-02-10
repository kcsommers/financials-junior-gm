import React from 'react';
import { ReactSVG } from 'react-svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import closeBtn from '@images/icons/cancel.svg';
import {
  TeamRankStick,
  MoneyLeftStick,
  StickButton,
  PlayerCard,
  HeaderComponent,
} from '@components';
import scoutStick from '@images/scout-stick.svg';
import teamStick from '@images/team-stick.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Tutorial, playersSlides } from '@tutorial';
import { Link } from 'react-router-dom';
import { setTutorialIsActive } from '@redux/actions';
import '@css/pages/page.css';
import '@css/pages/TeamPage.css';

const teamSlides = [playersSlides];

function TeamPage() {
  // GET TEAM FROM STORE

  const tutorialActive = useSelector((state) => state.tutorial.isActive);

  const dispatch = useDispatch();

  const onTutorialComplete = () => {
    dispatch(setTutorialIsActive({ isActive: false }));
  };

  const highlightPlayerCards = useSelector(
    (state) => state.tutorial.team.playerCard.highlight
  );

  return (
    <div className='page-container'>
      <HeaderComponent
        stickBtn={teamStick}
        objectives={['1. Learn about your budget.']}
      />

      <div className='page-body'>
        <div className='page-board'>
          <Link to='/home'>
            <ReactSVG className='page-board-close-btn' src={closeBtn} />
          </Link>

          <div className='team-page-board-left'>
            <div className='sticks-card card auto-card'>
              <TeamRankStick></TeamRankStick>
              <MoneyLeftStick></MoneyLeftStick>
            </div>
            <div className='jr-logo-wrap'>
              <ReactSVG className='jr-logo' src={jrSharksLogo} />
            </div>
            <div className='team-page-stick-btn-container'>
              <StickButton small={true} image={scoutStick} link='/scout' />
            </div>
          </div>

          <div className='team-page-board-right'>
            <h3 className='team-page-board-title color-primary outline-black'>
              San Jose Jr Sharks
            </h3>
            <div className='team-page-players-container'>
              <div className='active-players-container card auto-card'>
                <div className='team-page-players-row'>
                  <PlayerCard player={{ name: 'KACY' }} />
                  <PlayerCard highlight={highlightPlayerCards} />
                  <PlayerCard highlight={highlightPlayerCards} />
                </div>
                <div className='team-page-players-row'>
                  <PlayerCard player={{ name: 'KACY' }} />
                  <PlayerCard />
                  <PlayerCard />
                </div>
              </div>

              <div className='bench-container team-page-players-container card auto-card'>
                <p className='color-primary on-the-bench-text'>On the Bench</p>
                <div className='team-page-players-row team-page-bench-row'>
                  <PlayerCard player={{ name: 'KACY' }} />
                  <PlayerCard />
                  <PlayerCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tutorialActive && (
        <Tutorial slides={teamSlides} onComplete={onTutorialComplete} />
      )}
    </div>
  );
}

export default TeamPage;
