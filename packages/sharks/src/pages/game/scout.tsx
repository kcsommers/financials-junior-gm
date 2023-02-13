import { Header } from '@statrookie/core/src/components/Header';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import {
  getMoneyLevels,
  MoneyLevel,
} from '@statrookie/core/src/game/market/utils/get-money-levels';
import { GameProvider } from '@statrookie/core/src/game/game-context';
import FinancialsLogo from '../../components/svg/financials-logo-big.svg';
import { API_BASE_URL } from '../../constants/api-base-url';
import ConfirmIcon from '@statrookie/core/src/components/svg/check-circle-solid.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAuth } from '@statrookie/core/src/auth/context/auth-context';
import { Student } from '@statrookie/core/src/student/student.interface';
import { getMarket } from '@statrookie/core/src/game/teams/utils/get-market';
import { PlayerCard } from '@statrookie/core/src/components/PlayerCard';
import { useMemo } from 'react';
import { LoadingSpinner } from '@statrookie/core/src/components/LoadingSpinner';
import { AddPlayerCard } from '@statrookie/core/src/components/TeamBoard/AddPlayerCard';

const ScoutPage = () => {
  const onPlayerDropped = (e) => {
    console.log('player dropped:::: ', e);
  };

  const { authorizedUser, setAuthorizedUser } = useAuth();
  const student = authorizedUser as Student;
  const market = getMarket(student?.players);

  const moneyLevels = useMemo(() => {
    return getMoneyLevels(+student?.level) || [];
  }, [student]);

  console.log('market::: ', market);

  const getMoneyLevelRow = (level: MoneyLevel) => {
    let slots = [];
    for (let i = 0; i < level.available; i++) {
      slots.push(
        <div className="mx-3" key={`level-${level.level}-slot-${i}`}>
          <AddPlayerCard />
        </div>
      );
    }
    console.log('get row:::: ', slots);
    return slots;
  };

  return !student ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col h-full">
      <Header>
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
            <div className="flex items-center">
              <span className="text-primary mr-2 text-right">
                Click here when <br /> you finish!
              </span>
              <button className="mt-1" onClick={() => {}}>
                {/** @ts-ignore */}
                <ConfirmIcon width={50} className="fill-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex py-4">
          <div className="flex-1 pr-2">
            <p className="text-primary text-xs text-center">
              Remember to tap a player to learn more about them!
            </p>
            <div className="border-4 border-neutral-700 rounded-md bg-white">
              <div className="flex justify-around">
                {market.scout.available.slice(0, 3).map((player) => (
                  <div className="relative z-10" draggable="true">
                    <PlayerCard player={player} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between pl-2">
            {moneyLevels.map((level) => (
              <div>
                <p className="text-primary text-xs text-center">
                  These players get a {level.long} contract offered
                </p>
                <div
                  key={`level-${level.level}`}
                  className="bg-white border-4 border-neutral-700 rounded-md flex items-center justify-center py-2 relative"
                >
                  <span className="absolute text-2xl text-primary left-2 top-2">
                    ${level.amount}
                  </span>
                  {getMoneyLevelRow(level)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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

ProtectedScoutPage.getLayout = function getLayout(page: any) {
  return <GameProvider>{page}</GameProvider>;
};

export default ProtectedScoutPage;
