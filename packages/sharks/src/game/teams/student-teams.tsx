import { StudentTeam } from '@statrookie/core/src/game/teams/student-team.type';
import JrSharksLogo from '../../components/svg/jr-sharks-logo.svg';
import BarracudaLogo from '../../components/svg/sjbarracuda-logo.svg';
import SharksLogo from '../../components/svg/sjsharks-logo.svg';

export const studentTeams: StudentTeam[] = [
  {
    nickName: 'Jr. Sharks',
    city: 'San Jose',
    stats: { wins: 0, losses: 0, points: 0 },
    logo: <JrSharksLogo />,
    players: {},
  },
  {
    nickName: 'Barracuda',
    city: 'San Jose',
    stats: { wins: 0, losses: 0, points: 0 },
    logo: <BarracudaLogo />,
    players: {},
  },
  {
    nickName: 'Sharks',
    city: 'San Jose',
    stats: { wins: 0, losses: 0, points: 0 },
    logo: <SharksLogo />,
    players: {},
  },
];
