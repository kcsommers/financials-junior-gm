import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Button } from '@statrookie/core/src/components/Button';
import { DraggableItem } from '@statrookie/core/src/components/DraggableItem';
import { DroppableItem } from '@statrookie/core/src/components/DroppableItem';
import { Header } from '@statrookie/core/src/components/Header';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { Modal } from '@statrookie/core/src/components/Modal';
import { PlayerCard } from '@statrookie/core/src/components/PlayerCard';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import ConfirmIcon from '@statrookie/core/src/components/svg/check-circle-solid.svg';
import { AddPlayerCard } from '@statrookie/core/src/components/TeamBoard/AddPlayerCard';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import {
  getMoneyLevels,
  MoneyLevel,
} from '@statrookie/core/src/game/market/utils/get-money-levels';
import {
  Player,
  PlayerAssignments,
  PlayerAssignment,
} from '@statrookie/core/src/game/teams/players';
import { getMarket } from '@statrookie/core/src/game/teams/utils/get-market';
import { getPlayerMinMaxRank } from '@statrookie/core/src/game/teams/utils/get-player-minmax-rank';
import { Student } from '@statrookie/core/src/student/student.interface';
import { updateStudent } from '@statrookie/core/src/student/update-student';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { Preview } from 'react-dnd-preview';
import { TouchBackend } from 'react-dnd-touch-backend';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';

type DropData = {
  player: Player;
  offerRow?: number;
  offerRowSlot?: number;
  playerBoardIndex?: number;
};

type Offer = {
  item: DropData;
  offerRow?: number;
  offerRowSlot?: number;
};

const DND_TYPE = 'player';

const ScoutPage = () => {
  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const market = getMarket(student?.players);
  const [boardFull, setBoardFull] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [showBadOfferModal, setShowBadOfferModal] = useState(false);
  const [pendingOffer, setPendingOffer] = useState<Offer>();
  const [showNavBlockModal, setShowNavBlockModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const router = useRouter();

  const [offerBoard, setOfferBoard] = useState<Player[][]>([
    [null],
    [null, null],
    [null, null, null],
  ]);

  useEffect(() => {
    const isFull = offerBoard.every((row) => row.every((p) => !!p));
    setBoardFull(isFull);
  }, [offerBoard]);

  const [playerBoard, setPlayerBoard] = useState<Player[]>(
    market?.scout?.available || []
  );

  const moneyLevels = useMemo(() => {
    return getMoneyLevels(+student?.level) || [];
  }, [student]);

  const validateOffer = (offer: Offer): boolean => {
    const { min, max } = getPlayerMinMaxRank(+student.level);
    const moneyLevel = moneyLevels[offer.offerRow].level;
    if (moneyLevel === 1 && +offer.item.player.overallRank >= max) {
      setShowBadOfferModal(true);
      return false;
    }
    if (moneyLevel === 3 && +offer.item.player.overallRank <= min) {
      setPendingOffer(offer);
      return false;
    }

    return true;
  };

  const updateBoards = (offer: Offer) => {
    setOfferBoard((prevBoard) => {
      const clonedBoard = cloneDeep(prevBoard);
      clonedBoard[offer.offerRow][offer.offerRowSlot] = offer.item.player;
      if (!offer.item.playerBoardIndex) {
        clonedBoard[offer.item.offerRow][offer.item.offerRowSlot] = null;
      }
      return clonedBoard;
    });

    if (!offer.item.playerBoardIndex) {
      return;
    }
    setPlayerBoard((prevBoard) => {
      const clonedBoard = cloneDeep(prevBoard);
      clonedBoard[offer.item.playerBoardIndex] = null;
      return clonedBoard;
    });
  };

  const handleOfferDrop = (offer: Offer) => {
    const offerValid = validateOffer(offer);
    if (!offerValid) {
      return;
    }
    updateBoards(offer);
  };

  const handlePlayerBoardDrop = (item: DropData, boardIndex: number) => {
    setPlayerBoard((prevBoard) => {
      const clonedBoard = cloneDeep(prevBoard);
      clonedBoard[boardIndex] = item.player;
      if (item.playerBoardIndex) {
        clonedBoard[item.playerBoardIndex] = null;
      }
      return clonedBoard;
    });

    if (item.playerBoardIndex) {
      return;
    }
    setOfferBoard((prevBoard) => {
      const clonedBoard = cloneDeep(prevBoard);
      clonedBoard[item.offerRow][item.offerRowSlot] = null;
      return clonedBoard;
    });
  };

  const getMoneyLevelRow = (level: MoneyLevel, rowIndex: number) => {
    let slots = [];
    for (let i = 0; i < level.available; i++) {
      const player = offerBoard[rowIndex][i];
      slots.push(
        player ? (
          <div
            className="mx-3 -translate-y-1"
            key={`row-${rowIndex}-slot-${i}`}
          >
            <DraggableItem<DropData>
              type={DND_TYPE}
              item={{
                player,
                offerRow: rowIndex,
                offerRowSlot: i,
              }}
            >
              <PlayerCard
                player={player}
                onClick={() => setSelectedPlayer(player)}
              />
            </DraggableItem>
          </div>
        ) : (
          <div className="mx-3" key={`row-${rowIndex}-slot-${i}`}>
            <DroppableItem<DropData>
              type={DND_TYPE}
              isOverStyles={{
                transform: 'scale(1.1)',
                transition: 'all 0.2s ease',
              }}
              onDrop={(item) =>
                handleOfferDrop({ item, offerRow: rowIndex, offerRowSlot: i })
              }
            >
              <AddPlayerCard />
            </DroppableItem>
          </div>
        )
      );
    }
    return slots;
  };

  const completeScouting = async () => {
    const clonedPlayers = cloneDeep(student.players);
    offerBoard.forEach((row, i) => {
      const moneyLevel = moneyLevels[i];
      row.map((player) => {
        player.playerAssignment =
          PlayerAssignments.OFFERED_SCOUT as PlayerAssignment;
        player.playerCost = moneyLevel.amount;
        const playerIndex = clonedPlayers.findIndex(
          (p) => p._id === player._id
        );
        clonedPlayers.splice(playerIndex, 1, player);
      });
    });
    try {
      const updateStudentRes = await updateStudent(
        student._id,
        { players: clonedPlayers },
        API_BASE_URL
      );
      setAuthorizedUser(updateStudentRes.updatedStudent);
      router.push({
        pathname: '/game/team',
        query: { scoutingComplete: true },
      });
    } catch (error: any) {
      setShowErrorModal(true);
    }
  };

  return !student ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col h-full">
      <Header
        validateNavigation={() => {
          setShowNavBlockModal(true);
          return false;
        }}
      >
        <FinancialsLogo
          // @ts-ignore
          className="absolute left-1/2 top-2 -translate-x-1/2"
          width={175}
        />
      </Header>
      <div className="relative bg-neutral-200 rounded-md border-4 border-neutral-700 px-4 flex-1 my-4 mx-14 flex flex-col">
        <div className="relative h-80 flex items-center justify-between">
          <p className="text-primary h-full flex items-center absolute top-0 left-1/2 -translate-x-1/2 text-center text-lg">
            Make an offer to a player by dragging
            <br /> them to a contract level!
          </p>
          <div className="flex flex-1 items-center justify-between">
            <div></div>
            <div
              className={classNames('flex items-center', {
                disabled: !boardFull,
              })}
            >
              <span className="text-primary mr-2 text-right">
                Click here when <br /> you finish!
              </span>
              <button className="mt-1" onClick={completeScouting}>
                {/** @ts-ignore */}
                <ConfirmIcon width={50} className="fill-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 py-4">
          <div className="flex-1 pr-2 flex flex-col">
            <p className="text-primary text-xs text-center">
              Remember to tap a player to learn more about them!
            </p>
            <div className="flex-1 border-4 border-neutral-700 rounded-md bg-white">
              <div className="grid grid-cols-3 h-full">
                {playerBoard.map((player, i) => (
                  <div
                    className="items-center justify-center flex"
                    key={`player-board-${i}`}
                  >
                    {player ? (
                      <DraggableItem<DropData>
                        type={DND_TYPE}
                        item={{ player, playerBoardIndex: i }}
                      >
                        <PlayerCard
                          player={player}
                          onClick={() => setSelectedPlayer(player)}
                        />
                      </DraggableItem>
                    ) : (
                      <DroppableItem<DropData>
                        type={DND_TYPE}
                        isOverStyles={{
                          transform: 'scale(1.1)',
                          transition: 'all 0.2s ease',
                        }}
                        onDrop={(item) => handlePlayerBoardDrop(item, i)}
                      >
                        <div
                          key={`player-board-${i}`}
                          className="border-2 border-neutral-700 bg-neutral-200 rounded-md"
                          style={{ width: '90px', height: '110px' }}
                        ></div>
                      </DroppableItem>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between pl-2">
            {moneyLevels.map((level, i) => (
              <div key={`level-${level.level}`}>
                <p className="text-primary text-xs text-center">
                  These players get a {level.long} contract offered
                </p>
                <div
                  className="bg-white border-4 border-neutral-700 rounded-md flex items-center justify-center relative"
                  style={{ height: '142px' }}
                >
                  <span className="absolute text-2xl text-primary left-2 top-2">
                    ${level.amount}
                  </span>
                  {getMoneyLevelRow(level, i)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isVisible={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      >
        <div className="h-full flex items-center justify-center">
          <PlayerCard player={selectedPlayer} size="lg" />
        </div>
      </Modal>
      <Modal
        isVisible={showBadOfferModal}
        onClose={() => setShowBadOfferModal(false)}
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-20">
          <p className="text-primary text-4xl mb-8">
            The contract you are offering this player is not high enough!
          </p>
          <p className="text-primary text-2xl mb-16">
            Try putting them in a higher level to offer them more money.
          </p>
          <Button
            text="Try Again"
            onClick={() => setShowBadOfferModal(false)}
          />
        </div>
      </Modal>
      <Modal isVisible={!!pendingOffer} onClose={() => setPendingOffer(null)}>
        <div className="h-full flex flex-col items-center justify-center text-center p-20">
          <p className="text-primary text-4xl mb-8">Are you sure?</p>
          <p className="text-primary text-2xl mb-16">
            {pendingOffer?.item.player.playerName}'s rank is a little low for
            this contract level. Would you like to continue with this offer?
          </p>
          <Button
            text="Make Offer"
            onClick={() => {
              updateBoards(pendingOffer);
              setPendingOffer(null);
            }}
          />
        </div>
      </Modal>
      <Modal
        isVisible={showNavBlockModal}
        onClose={() => setShowNavBlockModal(false)}
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-20">
          <p className="text-primary text-4xl mb-8">
            Please scout all 6 players before leaving the scout page.
          </p>
          <Button
            text="Keep Scouting"
            onClick={() => {
              setShowNavBlockModal(false);
            }}
          />
        </div>
      </Modal>
      <Modal
        isVisible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-20">
          <p className="text-red-700 text-4xl mb-8">
            Oops! Something went wrong. Please try again.
          </p>
          <Button
            text="Go Back"
            onClick={() => {
              setShowErrorModal(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

const ProtectedScoutPage = () => {
  return (
    <ProtectedRoute apiBaseUrl={API_BASE_URL} permittedRoles="*">
      <ScoutPage />
    </ProtectedRoute>
  );
};

const generatePreview = ({ itemType, item, style }) => {
  return (
    <div style={style}>
      <PlayerCard player={item.player} />
    </div>
  );
};

ProtectedScoutPage.getLayout = function getLayout(page: any) {
  return (
    <GameProvider>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        {page}
        <Preview>{generatePreview}</Preview>
      </DndProvider>
    </GameProvider>
  );
};

export default ProtectedScoutPage;
