import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import { Player } from '../../game/teams/players';
import { StudentTeam } from '../../game/teams/student-team.type';
import { PlayerCard } from '../PlayerCard';
import { StudentTeamStatsView } from './StudentTeamStatsView';

type InjuredPlayerViewProps = {
  player: Player;
  studentTeam: StudentTeam;
  isProPlayer: boolean;
  getTeamLogo: (props?: { [key: string]: any }) => ReactElement;
};

export const InjuredPlayerView = ({
  player,
  studentTeam,
  isProPlayer,
  getTeamLogo,
}: InjuredPlayerViewProps) => {
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <StudentTeamStatsView studentTeam={studentTeam} />
      </div>
      <div className="flex-1">
        <motion.span
          className="inline-block relative"
          initial="enter"
          animate="center"
          variants={{
            enter: {
              scale: 0.75,
            },
            center: {
              scale: 1,
            },
          }}
          transition={{
            scale: {
              type: 'spring',
              stiffness: 500,
            },
          }}
        >
          <span className="scale-90 inline-block origin-top">
            <PlayerCard
              player={player}
              size="md"
              isProPlayer={isProPlayer}
              getTeamLogo={getTeamLogo}
            />
          </span>
        </motion.span>
      </div>
    </div>
  );
};
