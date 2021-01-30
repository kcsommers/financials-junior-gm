import React from 'react';
import Navigation from './HomeComponents/Navigation';
import Team from './HomeComponents/Team';
import '../css/Home.css';
import TeamRankCard from './HomeComponents/TeamRankCard';
import MiddleCard from './HomeComponents/MiddleCard';
import MoneyCardLeft from './HomeComponents/MoneyCardLeft';

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
      <Team/>
    </div>
  )
}
