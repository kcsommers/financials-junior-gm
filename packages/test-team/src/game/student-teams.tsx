import { StudentTeam } from '@statrookie/core/src/game/teams/student-team.type';
import JrSharksLogo from '../components/svg/jr-sharks-logo.svg';
import BarracudaLogo from '../components/svg/sjbarracuda-logo.svg';
import SharksLogo from '../components/svg/sjsharks-logo.svg';

export const studentTeams: StudentTeam[] = [
  {
    name: 'Jr. Sharks',
    city: 'San Jose',
    stats: { wins: 0, losses: 0, points: 0, standing: 13, rank: 0 },
    getLogo: (props = {}) => (
      // @ts-ignore
      <JrSharksLogo {...props} />
    ),
    players: {},
  },
  {
    name: 'Barracuda',
    city: 'San Jose',
    stats: { wins: 0, losses: 0, points: 0, standing: 13, rank: 0 },
    getLogo: (props = { width: '80px' }) => (
      // @ts-ignore
      <BarracudaLogo {...props} />
    ),
    players: {},
  },
  {
    name: 'Sharks',
    city: 'San Jose',
    stats: { wins: 0, losses: 0, points: 0, standing: 13, rank: 0 },
    getLogo: (props = { width: '80px' }) => (
      // @ts-ignore
      <SharksLogo {...props} />
    ),
    players: {},
  },
];
