import { useState } from 'react';
import { PlayerPositions } from '@data/players/players';
import { PlayerCard, InsufficientFundsOverlay } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import { Objectives } from '@data/objectives/objectives';
import '@css/components/MarketPlayersBoard.css';
import { getOpenAssignment } from '../data/players/players-utils';

const getPlayerCardStyles = (arrLength, playerIndex) => {
  let scale = 1.15;
  let marginRight = '2rem';
  let marginLeft = '0rem';
  if (arrLength > 5 && arrLength < 7) {
    scale = 1;
    marginRight = '1rem';
  } else if (arrLength > 5) {
    scale = 0.85;
    marginRight = '0.5rem';
  }

  if (playerIndex === arrLength - 1) {
    marginRight = '0rem';
  }

  if (arrLength === 1) {
    marginLeft = '2rem';
  }

  return {
    transform: `scale(${scale})`,
    marginRight,
    marginLeft,
  };
};

const getViewConfig = (position, marketPlayers) => {
  switch (position) {
    case PlayerPositions.FORWARD:
      return {
        players: marketPlayers.forward,
        title: 'Forwards you can sign',
        position: 'forward',
      };
    case PlayerPositions.DEFENSE:
      return {
        players: marketPlayers.defense,
        title: 'Defense you can sign',
        position: 'defense',
      };
    case PlayerPositions.GOALIE:
      return {
        players: marketPlayers.goalie,
        title: 'Goalies you can sign',
        position: 'goalie',
      };
    default: {
      return {};
    }
  }
};

export const MarketPlayersBoard = ({
  initialPosition,
  onPlayerCardClick,
  student,
  releasingPlayer,
  signAssignment,
}) => {
  const dispatch = useDispatch();

  const scenarioAssignment =
    student.objectives &&
    student.objectives[Objectives.SEASON_SCENARIO] === false
      ? getOpenAssignment(null, student)
      : '';

  // if there is an active season scenario, only the scouted players
  // should be available to sign
  const marketPlayers = useSelector((state) =>
    scenarioAssignment && scenarioAssignment === signAssignment
      ? state.players.scoutingState.offeredScoutPlayers
      : state.players.marketPlayers
  );

  const { moneySpent } = useSelector((state) => state.players);
  const [activePosition, setActivePosition] = useState(initialPosition);

  const checkBudget = (signingPlayer) => {
    let budget = +student.totalBudget - +student.savingsBudget - moneySpent;

    if (releasingPlayer) {
      budget += +releasingPlayer.playerCost;
    }

    if (budget - signingPlayer.playerCost < 0) {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: <InsufficientFundsOverlay />,
        })
      );
      return;
    }

    onPlayerCardClick(signingPlayer);
  };

  const forwardsActive = activePosition === PlayerPositions.FORWARD;
  const goaliesActive = activePosition === PlayerPositions.GOALIE;
  const defenseActive = activePosition === PlayerPositions.DEFENSE;

  const currentView = getViewConfig(activePosition, marketPlayers);

  return (
    <div>
      <div className="market-players-board-btns-container">
        <div
          className={`box-shadow market-players-board-tab-btn${
            forwardsActive ? '' : ' disabled'
          }`}
          onClick={() => {
            if (forwardsActive) {
              setActivePosition(PlayerPositions.FORWARD);
            }
          }}
        >
          <div className="market-players-board-tab-btn-inner">
            <span className="outline-black">Forwards</span>
          </div>
        </div>
        <div
          className={`box-shadow market-players-board-tab-btn${
            defenseActive ? '' : ' disabled'
          }`}
          onClick={() => {
            if (defenseActive) {
              setActivePosition(PlayerPositions.DEFENSE);
            }
          }}
        >
          <div className="market-players-board-tab-btn-inner">
            <span className="outline-black">Defense</span>
          </div>
        </div>
        <div
          className={`box-shadow market-players-board-tab-btn${
            goaliesActive ? '' : ' disabled'
          }`}
          onClick={() => {
            if (goaliesActive) {
              setActivePosition(PlayerPositions.GOALIE);
            }
          }}
        >
          <div className="market-players-board-tab-btn-inner">
            <span className="outline-black">Goalies</span>
          </div>
        </div>
      </div>
      <div className="market-players-board-inner">
        <h3 className="color-primary market-players-board-title">
          {currentView.title}
        </h3>
        <div
          className="market-players-board-players-wrap"
          style={
            currentView.players.length > 1
              ? {
                  justifyContent: 'space-around',
                }
              : {}
          }
        >
          {currentView.players.map((p, i) => (
            <div
              key={i}
              style={getPlayerCardStyles(currentView.players.length, i)}
            >
              <PlayerCard player={p} onClick={checkBudget.bind(this, p)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
