import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { OpposingTeam } from '../../game/teams/opposing-team.type';
import { StudentTeam } from '../../game/teams/student-team.type';
import { SeasonTutorialComponents } from '../../tutorial/component-configs/season-tutorial-components';

type StandingsBoardProps = {
  studentTeam: StudentTeam;
  opposingTeams: OpposingTeam[];
  tutorialComponentConfigs: SeasonTutorialComponents;
};

export const StandingsBoard = ({
  studentTeam,
  opposingTeams,
  tutorialComponentConfigs,
}: StandingsBoardProps) => {
  const standings = useMemo(
    () =>
      [studentTeam, ...opposingTeams].sort(
        (a, b) => a.stats.standing - b.stats.standing
      ),
    [studentTeam, opposingTeams]
  );

  const displayedTeams =
    studentTeam.stats.standing <= 4
      ? standings.slice(0, 5)
      : [...standings.slice(0, 4), studentTeam];

  return (
    <div>
      <p className="text-center text-xl">Standings</p>
      <motion.div
        className="relative rounded-md border-5 border-neutral-600 bg-white flex flex-col h-[150px] w-[320px]"
        animate="animate"
        variants={tutorialComponentConfigs.standingsBoard?.variants}
        transition={
          tutorialComponentConfigs.standingsBoard?.transition || { duration: 1 }
        }
      >
        <div className="h-5 border-b-1 text-[0.8rem] border-neutral-700 flex pl-2">
          <p className="text-neutral-700 flex-1">Team</p>
          <p className="text-neutral-700 border-l-1 border-neutral-700 m-w flex justify-center items-center min-w-[75px] max-w-[75px]">
            Points
          </p>
        </div>
        {displayedTeams.map((team) => (
          <div
            key={team.name}
            className="flex flex-1 pl-2 text-[1.1rem]"
            style={{ lineHeight: '100%' }}
          >
            <p
              className={classNames('flex-1 flex items-center', {
                'font-bold text-primary': team.name === studentTeam.name,
              })}
            >
              <span className="mr-2">{team.stats.standing}.</span>
              {team.name === studentTeam.name ? 'S.J.' : ''} {team.name}
            </p>
            <p
              className={classNames(
                'border-l-1 border-neutral-700 flex justify-center items-center min-w-[75px] max-w-[75px]',
                {
                  'font-bold text-primary': team.name === studentTeam.name,
                }
              )}
            >
              {team.stats.points}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
