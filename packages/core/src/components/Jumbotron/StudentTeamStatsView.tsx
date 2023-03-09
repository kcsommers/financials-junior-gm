import { motion } from 'framer-motion';
import { StudentTeam } from '../../game/teams/student-team.type';
import { SeasonTutorialComponents } from '../../tutorial/component-configs/season-tutorial-components';
import { TeamCard } from '../TeamCard';

type StudentTeamStatsViewProps = {
  studentTeam: StudentTeam;
  tutorialComponentConfigs?: SeasonTutorialComponents;
};

export const StudentTeamStatsView = ({
  studentTeam,
  tutorialComponentConfigs,
}: StudentTeamStatsViewProps) => {
  return (
    <div className="py-4 pl-4 pr-2 h-full flex flex-col justify-between">
      <TeamCard team={studentTeam} />
      <motion.div
        className="flex items-center justify-between max-w-[195px] border-4 box-content border-transparent bg-neutral-500 rounded-md"
        animate="animate"
        variants={tutorialComponentConfigs?.statsBoard?.variants}
        transition={
          tutorialComponentConfigs?.statsBoard?.transition || { duration: 1 }
        }
      >
        <span className="flex flex-col items-center justify-center">
          <span className="text-white text-xl">Wins</span>
          <span className="bg-white rounded-lg flex items-center justify-center text-4xl font-bold shadow-mat w-[55px] h-[55px]">
            {String(studentTeam.stats.wins)}
          </span>
        </span>
        <span className="flex flex-col items-center justify-center">
          <span className="text-white text-xl">Losses</span>
          <span className="bg-white rounded-lg flex items-center justify-center text-4xl font-bold shadow-mat w-[55px] h-[55px]">
            {String(studentTeam.stats.losses)}
          </span>
        </span>
        <span className="flex flex-col items-center justify-center">
          <span className="text-white text-xl">Points</span>
          <span className="bg-white rounded-lg flex items-center justify-center text-4xl font-bold shadow-mat w-[55px] h-[55px]">
            {String(studentTeam.stats.points)}
          </span>
        </span>
      </motion.div>
    </div>
  );
};
