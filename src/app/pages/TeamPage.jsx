import React from 'react';
import { ReactSVG } from 'react-svg';
import teamPageHockeyStick from '@images/icons/team-page-hockey-stick.svg';
import dualLogo from '@images/icons/sharks-logo.svg';
import scout from '@images/icons/scout.svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo.svg';
import closeBtn from '@images/icons/cancel.svg';
import playerImage from '@images/icons/player-image.svg';
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

function TeamPage() {
  // GET TEAM FROM STORE

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
          <ReactSVG className='team-page-board-close-btn' src={closeBtn} />
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
                <PlayerCard />
                <PlayerCard />
                <PlayerCard />
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
    </div>
    // <div className='team-page'>
    //   {/* header portion */}
    //   <div className='team-page-header'>
    //     <ReactSVG
    //       className='team-page-hockey-stick'
    //       src={teamPageHockeyStick}
    //     />
    //     <ReactSVG className='sharks-logo' src={dualLogo} />
    //     <div className='objectives-board'>
    //       <div className='objective-level-box'>
    //         <div>Objectives</div>
    //         <div>Lv1</div>
    //       </div>
    //       <div className='ordered-list'>
    //         <div>1. Learn about your budget.</div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Team Dashboard */}
    //   <div className='team-dashboard'>
    //     <div>
    //       <div className='team-state-visual'>
    //         <div className='team-state-visual-container'>
    //           <h1 className='team-dashboard-rank-title'>
    //             Team <br />
    //             Rank
    //           </h1>
    //           <div className='team-dashboard-rank-hockey-stick-box'>
    //             <ReactSVG src={hockeyVisual1} />
    //           </div>
    //         </div>
    //         <div className='team-dashboard-rank-circle'>
    //           <p>85</p>
    //         </div>
    //         <div className='team-money-left-circle'>
    //           <p>25</p>
    //         </div>
    //         <div className='team-money-left-hockey-stick-box'>
    //           <ReactSVG src={hockeyVisual2} />
    //         </div>
    //         <h1 className='team-money-left-title'>
    //           Money <br />
    //           Left
    //         </h1>
    //       </div>

    //       {/* sign player */}
    //       <div>
    //         <ReactSVG src={signPlayer} />
    //         <p className='add-players-text'>Add new players to your team!</p>
    //       </div>

    //       {/* scout player */}
    //       <div className='team-scout-player'>
    //         <ReactSVG src={scout} />
    //         <p className='scout-text'>
    //           Decide which new recruits are the most valuable
    //         </p>
    //       </div>
    //     </div>
    //     {/* end of left half of team dashboard */}

    //     {/* right half of team dashboard */}
    //     <div className='team-dashboard-right-half'>
    //       <div className='team-dashboard-header'>
    //         <div className='jr-sharks-logo'>
    //           <ReactSVG src={jrSharksLogo} />
    //         </div>
    //         <div className='team-dashboard-title'>
    //           <p>San Jose Jr Sharks</p>
    //         </div>
    //         <div className='cancel-icon'>
    //           <ReactSVG src={cancel} />
    //         </div>
    //       </div>

    //       <div className='team-dashboard-players'>
    //         <div className='team-dashboard-players-top-row'>
    //           <div>
    //             <p className='player-card-title'>Position</p>
    //             <div className='team-dashboard-players-card-top'>
    //               <div>
    //                 <div className='rank-text'>Rank</div>
    //                 <div className='rank-number'>50</div>
    //               </div>
    //               <div className='player-cost'>$2</div>
    //             </div>
    //             <div className='team-dashboard-players-card'>
    //               <ReactSVG src={playerImage} />
    //               <div className='player-meters-row'>
    //                 <div>
    //                   <p>Off</p>
    //                   <div className='offense-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Pass</p>
    //                   <div className='passing-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Def</p>
    //                   <div className='defense-meter'></div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className='player-card-position-2'>
    //             <p className='player-card-title'>Position</p>
    //             <div className='team-dashboard-players-card-top'>
    //               <div>
    //                 <div className='rank-text'>Rank</div>
    //                 <div className='rank-number'>50</div>
    //               </div>
    //               <div className='player-cost'>$2</div>
    //             </div>
    //             <div className='team-dashboard-players-card'>
    //               <ReactSVG src={playerImage} />
    //               <div className='player-meters-row'>
    //                 <div>
    //                   <p>Off</p>
    //                   <div className='offense-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Pass</p>
    //                   <div className='passing-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Def</p>
    //                   <div className='defense-meter'></div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div>
    //             <p className='player-card-title'>Position</p>
    //             <div className='team-dashboard-players-card-top'>
    //               <div>
    //                 <div className='rank-text'>Rank</div>
    //                 <div className='rank-number'>50</div>
    //               </div>
    //               <div className='player-cost'>$2</div>
    //             </div>
    //             <div className='team-dashboard-players-card'>
    //               <ReactSVG src={playerImage} />
    //               <div className='player-meters-row'>
    //                 <div>
    //                   <p>Off</p>
    //                   <div className='offense-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Pass</p>
    //                   <div className='passing-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Def</p>
    //                   <div className='defense-meter'></div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className='team-dashboard-players-bottom-row'>
    //           <div>
    //             <p className='player-card-title'>Position</p>
    //             <div className='team-dashboard-players-card-top'>
    //               <div>
    //                 <div className='rank-text'>Rank</div>
    //                 <div className='rank-number'>50</div>
    //               </div>
    //               <div className='player-cost'>$2</div>
    //             </div>
    //             <div className='team-dashboard-players-card'>
    //               <ReactSVG src={playerImage} />
    //               <div className='player-meters-row'>
    //                 <div>
    //                   <p>Off</p>
    //                   <div className='offense-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Pass</p>
    //                   <div className='passing-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Def</p>
    //                   <div className='defense-meter'></div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className='player-card-position-5'>
    //             <p className='player-card-title'>Position</p>
    //             <div className='team-dashboard-players-card-top'>
    //               <div>
    //                 <div className='rank-text'>Rank</div>
    //                 <div className='rank-number'>50</div>
    //               </div>
    //               <div className='player-cost'>$2</div>
    //             </div>
    //             <div className='team-dashboard-players-card'>
    //               <ReactSVG src={playerImage} />
    //               <div className='player-meters-row'>
    //                 <div>
    //                   <p>Off</p>
    //                   <div className='offense-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Pass</p>
    //                   <div className='passing-meter'></div>
    //                 </div>
    //                 <div>
    //                   <p>Def</p>
    //                   <div className='defense-meter'></div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div>
    //             <p className='player-card-title-transparent'>Position</p>
    //             <div className='add-player-card'>
    //               <div>Add</div>
    //               <div>Player</div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='team-dashboard-bench'>
    //         <p className='team-dashboard-bench-title'>On the Bench</p>
    //         <div className='team-dashboard-bench-row'>
    //           <div className='add-player-card'>
    //             <div>Add</div>
    //             <div>Player</div>
    //           </div>
    //           <div className='add-player-card'>
    //             <div>Add</div>
    //             <div>Player</div>
    //           </div>
    //           <div className='add-player-card'>
    //             <div>Add</div>
    //             <div>Player</div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* end of team dashboard div */}
    // </div>
  );
}

export default TeamPage;
