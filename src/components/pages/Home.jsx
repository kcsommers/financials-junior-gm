import React from 'react';
import Navigation from '../HomeComponents/Navigation';
import Team from '../HomeComponents/Team';
import '../../css/home_page/Home.css';
import TeamRankCard from '../HomeComponents/TeamRankCard';
import ObjectivesBoard from '../HomeComponents/ObjectivesBoard';
import MoneyLeftCard from '../HomeComponents/MoneyLeftCard';
import Season from '../HomeComponents/Season';
import Logo from '../HomeComponents/Logo';
import Budget from '../HomeComponents/Budget';
import Trophies from '../HomeComponents/Trophies';
import Tutorial from './../../app/tutorial/Tutorial';

const isFirstTime = true;

export default function Home() {
  return (
    <div>
      <Navigation />
      <div className='home-cards-row'>
        <div className='team-rank-card-box'>
          <TeamRankCard />
        </div>
        <div className='middle-card-box'>
          <ObjectivesBoard tutorialActive={isFirstTime} />
        </div>
        <div className='money-left-card-box'>
          <MoneyLeftCard />
        </div>
      </div>
      <div className='hockey-stick-buttons-container'>
        <div>
          <Team />
          <Season />
        </div>
        <div className='logo-container'>
          <Logo />
        </div>
        <div>
          <Budget />
          <Trophies />
        </div>
      </div>
      {isFirstTime && <Tutorial />}
    </div>
  );
}
