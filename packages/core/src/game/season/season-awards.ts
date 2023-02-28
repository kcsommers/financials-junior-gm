import { cloneDeep } from 'lodash';
import { StudentTeam } from '../../game/teams/student-team.type';
import { Student } from '../../student/student.interface';

export type AwardName = 'savingsCup' | 'thirdCup' | 'firstCup';

export type SeasonAwards = {
  [key in AwardName]: boolean;
};

export const updateSeasonAwards = (
  student: Student,
  studentTeam: StudentTeam
): SeasonAwards[] => {
  const clonedAwards = cloneDeep(student.awards || []);
  const prevSeasonAwards =
    clonedAwards[+student.level - 1] || ({} as SeasonAwards);

  const firstCup =
    prevSeasonAwards.firstCup || studentTeam.stats.standing === 1;
  const thirdCup = prevSeasonAwards.thirdCup || studentTeam.stats.standing <= 3;
  const savingsCup = prevSeasonAwards.savingsCup || student.savingsBudget > 0;
  clonedAwards[+student.level - 1] = {
    firstCup,
    thirdCup,
    savingsCup,
  };
  console.log('firstCup:::: ', firstCup, thirdCup, savingsCup);
  return clonedAwards;
};

export type Award = {
  name: string;
  description: string;
  studentReceived: boolean;
};

export const getSeasonAwards = (
  student: Student,
  forLevel: number
): Award[] => {
  const seasonAwards =
    (student.awards || [])[forLevel - 1] || ({} as SeasonAwards);

  const awards = [
    {
      name: 'Savings Cup',
      description:
        'Win this cup by completing the season with savings leftover!',
      studentReceived: seasonAwards.savingsCup,
    },
    {
      name: 'Top Three Cup',
      description: 'Win this cup by placing in the top three!',
      studentReceived: seasonAwards.thirdCup,
    },
    {
      name:
        forLevel === 1
          ? 'Comerica Cup'
          : forLevel === 2
          ? 'Calder Cup'
          : 'Stanley Cup',
      description: 'Win this cup by coming in first place for the season!',
      studentReceived: seasonAwards.firstCup,
    },
  ];

  return awards;
};
