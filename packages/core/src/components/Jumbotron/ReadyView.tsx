import classNames from 'classnames';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { SeasonTutorialComponents } from '../../tutorial/component-configs/season-tutorial-components';
import { Indicator } from '../Indicator';
import { LoadingSpinner } from '../LoadingSpinner';
import { StudentTeamStatsView } from './StudentTeamStatsView';

type ReadyViewProps = {
  studentTeam: StudentTeam;
  currentOpponent: OpposingTeam;
  upcomingOpponents: OpposingTeam[];
  tutorialComponentConfigs: SeasonTutorialComponents;
};

export const ReadyView = ({
  studentTeam,
  currentOpponent,
  upcomingOpponents,
  tutorialComponentConfigs,
}: ReadyViewProps) => {
  return !studentTeam || !currentOpponent ? (
    <LoadingSpinner />
  ) : (
    <div className="flex">
      <div className="flex-1">
        <StudentTeamStatsView
          studentTeam={studentTeam}
          tutorialComponentConfigs={tutorialComponentConfigs}
        />
      </div>

      <div className="flex-1">
        <div className="pb-4 pr-4 pl-2 h-full flex flex-col">
          <p className="text-white text-center text-lg">Next Opponent</p>
          <div className="flex items-center justify-between bg-white rounded-lg p-2">
            <span className="border-neutral-700 border-2 rounded-md flex-1 mr-4 h-[75px] relative">
              {currentOpponent.getLogo({
                className: 'w-full h-full',
              })}
            </span>
            <Indicator
              value={currentOpponent.stats.rank}
              direction="left"
              textColor={currentOpponent.color}
            />
          </div>
          <p className="text-white text-center text-lg">Upcoming Opponents</p>
          <div className="bg-white rounded-lg p-2 flex-1">
            {upcomingOpponents.map((team, i) => (
              <div
                key={team.name}
                className={classNames('flex items-center justify-between', {
                  'mb-2': i === 0,
                })}
              >
                <span className="border-neutral-700 border-2 rounded-md flex-1 mr-4 h-[55px] relative">
                  {team.getLogo({ className: 'w-full h-full' })}
                </span>
                <Indicator
                  value={team.stats.rank}
                  direction="left"
                  textColor={team.color}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
