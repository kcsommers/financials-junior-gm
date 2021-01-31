import React from 'react';
import Navigation from './HomeComponents/Navigation';
import Team from './HomeComponents/Team';
import '../css/Home.css';
import TeamRankCard from './HomeComponents/TeamRankCard';
import MiddleCard from './HomeComponents/MiddleCard';
import MoneyCardLeft from './HomeComponents/MoneyCardLeft';
import Season from './HomeComponents/Season';
import Logo from './HomeComponents/Logo';
import Budget from './HomeComponents/Budget';
import Trophies from './HomeComponents/Trophies';

export default function Home() {
  return (
    <div>
      <Navigation/>
      <div className="home-cards-row">
        <div className="team-rank-card-box">
          <TeamRankCard/>
        </div>
        <div className="middle-card-box">
          <MiddleCard/>
        </div>
        <div className="money-left-card-box">
          <MoneyCardLeft/>
        </div>
      </div>
      <div className="hockey-stick-buttons-container">
        <div>
          <Team/>
          <Season/>
        </div>
        <div className="logo-container">
          <Logo/>
        </div>
        <div>
          <Budget/>
          <Trophies/>
        </div>
      </div>
      
    </div>
  )
}
