import { useState } from 'react';
import { PlayerPositions } from '@data/players/players';
import { PlayerCard, InsufficientFundsOverlay } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import '@css/components/MarketPlayersBoard.css';

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
    case PlayerPositions.BENCH:
      return {
        players: marketPlayers.forward,
        title: 'Forwards you can sign',
        position: 'forward',
      };
    case PlayerPositions.DEFENDER:
      return {
        players: marketPlayers.defender,
        title: 'Defenders you can sign',
        position: 'defender',
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
}) => {
  const dispatch = useDispatch();
  const marketPlayers = useSelector((state) =>
    initialPosition === PlayerPositions.BENCH
      ? state.players.scoutingState.offeredScoutPlayers
      : state.players.marketPlayers
  );

  const [activePosition, setActivePosition] = useState(initialPosition);

  const currentView = getViewConfig(activePosition, marketPlayers);

  const checkBudget = (signingPlayer) => {
    let budget =
      student.totalBudget - student.savingsBudget - student.moneySpent;

    if (releasingPlayer) {
      budget += +releasingPlayer.playerCost;
    }

    if (budget - signingPlayer.playerCost < 0) {
      dispatch(
        toggleOverlay({
          isOpen: true,
          template: (
            <InsufficientFundsOverlay
              budget={budget}
              student={student}
              signingPlayer={signingPlayer}
              onUseRollover={onPlayerCardClick}
            />
          ),
        })
      );
      return;
    }

    onPlayerCardClick(signingPlayer);
  };

  const forwardsActive =
    activePosition === PlayerPositions.FORWARD ||
    initialPosition === PlayerPositions.BENCH;
  const goaliesActive =
    activePosition === PlayerPositions.GOALIE ||
    initialPosition === PlayerPositions.BENCH;
  const defendersActive =
    activePosition === PlayerPositions.DEFENDER ||
    initialPosition === PlayerPositions.BENCH;

  return (
    <div>
      <div className='market-players-board-btns-container'>
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
          <div className='market-players-board-tab-btn-inner'>
            <span className='outline-black'>Forwards</span>
          </div>
        </div>
        <div
          className={`box-shadow market-players-board-tab-btn${
            defendersActive ? '' : ' disabled'
          }`}
          onClick={() => {
            if (defendersActive) {
              setActivePosition(PlayerPositions.DEFENDER);
            }
          }}
        >
          <div className='market-players-board-tab-btn-inner'>
            <span className='outline-black'>Defender</span>
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
          <div className='market-players-board-tab-btn-inner'>
            <span className='outline-black'>Goalies</span>
          </div>
        </div>
      </div>
      <div className='market-players-board-inner'>
        <h3 className='color-primary market-players-board-title'>
          {currentView.title}
        </h3>
        <div
          className='market-players-board-players-wrap'
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
