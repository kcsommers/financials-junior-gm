import { Button, OverlayBoard } from '@components';
import '@css/components/SeasonStatsOverlay.css';
import { getStanding } from '@data/season/season-utils';
import { toggleOverlay } from '@redux';
import { useDispatch, useSelector } from 'react-redux';
import { getTopPlayer } from '../../data/players/players-utils';
import { getDollarString } from '../../utils';

export const SeasonStatsOverlay = ({
  student,
  seasonState,
  onContinue = null,
  onExit,
}) => {
  const dispatch = useDispatch();
  const { moneySpent } = useSelector((state) => state.players);
  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '4rem 0rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3
          className="color-primary"
          style={{ marginBottom: '1rem', fontSize: '1.75rem' }}
        >
          You have just completed a double header!
        </h3>
        <p className="color-accent">
          Here are your stats for the season so far:
        </p>
        <div className="stats-container">
          <div className="stat-wrap color-primary">
            <span>Wins</span>
            <span>{seasonState.seasonTeam.stats.wins}</span>
          </div>
          <div className="stat-wrap color-primary">
            <span>Losses</span>
            <span>{seasonState.seasonTeam.stats.losses}</span>
          </div>
          <div className="stat-wrap color-primary">
            <span>Team Standing</span>
            <span>
              {getStanding(seasonState.seasonTeam, seasonState.standings)}
            </span>
          </div>
          <div className="stat-wrap color-primary">
            <span>Money Spent</span>
            <span>{getDollarString(moneySpent)}</span>
          </div>
          <div className="stat-wrap color-primary">
            <span>Savings</span>
            <span>{getDollarString(student.savings) || '$0'}</span>
          </div>
          <div className="stat-wrap color-primary">
            <span>Top Player</span>
            <span>{getTopPlayer(student.players).playerName}</span>
          </div>
        </div>
        <div
          style={{
            marginTop: '6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Button
            text="Continue Season"
            onClick={() => {
              dispatch(toggleOverlay({ isOpen: false, template: null }));
              if (onContinue) {
                onContinue();
              }
            }}
          />
          <Button
            text="Save and Exit"
            onClick={() => {
              dispatch(toggleOverlay({ isOpen: false, template: null }));
              if (onExit) {
                onExit();
              }
            }}
          />
        </div>
      </div>
    </OverlayBoard>
  );
};
