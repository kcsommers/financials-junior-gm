import DollarSign from '@statrookie/core/src/components/svg/dollar-sign.svg';
import HockeySticks from '@statrookie/core/src/components/svg/season-sticks.svg';
import Players from '@statrookie/core/src/components/svg/team-players.svg';
import Trophy from '@statrookie/core/src/components/svg/trophy.svg';
import { useAuth } from '../../auth/context/auth-context';
import { GamePage } from '../../game/game-page.type';
import { startingLineupFull } from '../../game/teams/utils/starting-lineup-full';
import { Student } from '../../student/student.interface';
import { capitalize } from '../../utils/capitalize';
import { Button } from '../Button';

type FooterProps = {
  pageLinks: GamePage[];
};

export const Footer = ({ pageLinks }: FooterProps) => {
  const student = useAuth().authorizedUser as Student;

  const allTutorialsViewed =
    student &&
    student.tutorials &&
    student.tutorials.home &&
    student.tutorials.budget &&
    student.tutorials.team &&
    student.tutorials.scout &&
    student.tutorials.season;

  const getButtonConfigs = () => {
    const isDisabled = !allTutorialsViewed;
    const btnConfigs = {
      team: {
        bgColorClass: 'bg-secondary',
        href: '/game/team',
        // @ts-ignore
        icon: <Players width={100} />,
        isDisabled,
      },
      trophies: {
        bgColorClass: 'bg-foreground',
        href: '/game/trophies',
        // @ts-ignore
        icon: <Trophy width={35} />,
        isDisabled,
      },
      season: {
        bgColorClass: 'bg-secondary',
        href: '/game/season',
        // @ts-ignore
        icon: <HockeySticks width={50} />,
        isDisabled,
      },
      budget: {
        bgColorClass: 'bg-foreground',
        href: '/game/budget',
        // @ts-ignore
        icon: <DollarSign width={35} />,
        isDisabled,
      },
    };
    if (+student.level > 1) {
      const pagesVisited = student ? student.pagesVisited || [] : [];
      if (!btnConfigs.team.isDisabled) {
        btnConfigs.team.isDisabled = !pagesVisited.includes('budget');
      }
      if (!btnConfigs.season.isDisabled) {
        btnConfigs.season.isDisabled = !startingLineupFull(student);
      }
    }
    return btnConfigs;
  };

  const btnConfigs = getButtonConfigs();
  return (
    <div className="py-3 px-12 h-footer">
      <div className="flex items-center justify-around">
        {pageLinks.map((page: GamePage) => (
          <Button
            key={page}
            size="md"
            isDisabled={btnConfigs[page].isDisabled}
            text={capitalize(page)}
            bgColorClass={btnConfigs[page].bgColorClass}
            href={btnConfigs[page].href}
          >
            {btnConfigs[page].icon}
          </Button>
        ))}
      </div>
    </div>
  );
};
