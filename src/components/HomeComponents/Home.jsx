import React from 'react';
import Navigation from './Navigation';
import Team from './Team';
import '../../css/home_page/Home.css';
import TeamRankCard from './TeamRankCard';
import MiddleCard from './MiddleCard';
import MoneyLeftCard from './MoneyLeftCard';
import Season from './Season';
import Logo from './Logo';
import Budget from './Budget';
import Trophies from './Trophies';

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
          <MoneyLeftCard/>
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
