export const student = {
  studentFirstName: 'Joni',
  studentLastName: 'Blue',
  studentUserName: 'JoBlue',
  studentPassword: 'sleepyjo',
  totalBudget: 10,
  savingsBudget: 0,
  fOne: null,
  fTwo: null,
  fThree: null,
  dOne: null,
  dTwo: null,
  gOne: null,
  benchOne: null,
  benchTwo: null,
  benchThree: null,
  season: '',
  level: 1,
  timeSpent: 0,
};

export const getStudent = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(student);
    }, 1000);
  });
};

export const players = [
  {
    playerName: 'Marcus Sorensen',
    playerPosition: 'forward',
    offensiveRank: 44,
    passRank: 19,
    defensiveRank: 21,
    overallRank: 30,
    sharkPlayer: 'TRUE',
    playerCost: 3,
    playerAssignment: 'marketPlayer',
    imageName: 'sorensen.jpg',
    playerLevel: 1,
  },
  {
    playerName: 'Ryan Donato',
    playerPosition: 'forward',
    offensiveRank: 47,
    passRank: 13,
    defensiveRank: 17,
    overallRank: 30,
    sharkPlayer: 'TRUE',
    playerCost: 3,
    playerAssignment: 'marketPlayer',
    imageName: 'donato.jpg',
    playerLevel: 1,
  },
  {
    playerName: 'Martin Jones',
    playerPosition: 'goalie',
    offensiveRank: null,
    passRank: null,
    defensiveRank: null,
    overallRank: 25,
    sharkPlayer: 'TRUE',
    playerCost: 2.5,
    playerAssignment: 'marketPlayer',
    imageName: 'jones.jpg',
    playerLevel: 1,
  },
  {
    playerName: 'Anabelle Rodrigues',
    playerPosition: 'defender',
    offensiveRank: 21,
    passRank: 19,
    defensiveRank: 40,
    overallRank: 25,
    sharkPlayer: 'FALSE',
    playerCost: 2.5,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Mario Ferraro',
    playerPosition: 'defender',
    offensiveRank: 7,
    passRank: 17,
    defensiveRank: 55,
    overallRank: 25,
    sharkPlayer: 'TRUE',
    playerCost: 2.5,
    playerAssignment: 'marketPlayer',
    imageName: 'ferraro.jpg',
    playerLevel: 1,
  },
  {
    playerName: 'Randall Nixon',
    playerPosition: 'defender',
    offensiveRank: 16,
    passRank: 20,
    defensiveRank: 24,
    overallRank: 20,
    sharkPlayer: 'FALSE',
    playerCost: 2.5,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Matthew Nieto',
    playerPosition: 'forward',
    offensiveRank: 24,
    passRank: 22,
    defensiveRank: 19,
    overallRank: 20,
    sharkPlayer: 'TRUE',
    playerCost: 2,
    playerAssignment: 'marketPlayer',
    imageName: 'nieto.jpg',
    playerLevel: 1,
  },
  {
    playerName: 'Dylan Gambrell',
    playerPosition: 'forward',
    offensiveRank: 21,
    passRank: 14,
    defensiveRank: 34,
    overallRank: 20,
    sharkPlayer: 'TRUE',
    playerCost: 2,
    playerAssignment: 'marketPlayer',
    imageName: 'gambrell.jpg',
    playerLevel: 1,
  },
  {
    playerName: 'Janelle Kingsly',
    playerPosition: 'forward',
    offensiveRank: 24,
    passRank: 20,
    defensiveRank: 16,
    overallRank: 20,
    sharkPlayer: 'FALSE',
    playerCost: 2,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Amanda Li',
    playerPosition: 'defender',
    offensiveRank: 5,
    passRank: 10,
    defensiveRank: 30,
    overallRank: 15,
    sharkPlayer: 'FALSE',
    playerCost: 2,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Damien Goodwin',
    playerPosition: 'defender',
    offensiveRank: 5,
    passRank: 15,
    defensiveRank: 25,
    overallRank: 15,
    sharkPlayer: 'FALSE',
    playerCost: 1.5,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Fatima Khan',
    playerPosition: 'forward',
    offensiveRank: 30,
    passRank: 15,
    defensiveRank: 5,
    overallRank: 15,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Natasha Greer',
    playerPosition: 'defender',
    offensiveRank: 5,
    passRank: 20,
    defensiveRank: 20,
    overallRank: 15,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Milosav Mandic',
    playerPosition: 'goalie',
    offensiveRank: null,
    passRank: null,
    defensiveRank: null,
    overallRank: 15,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: "Fintan O'Quinn",
    playerPosition: 'goalie',
    offensiveRank: null,
    passRank: null,
    defensiveRank: null,
    overallRank: 15,
    sharkPlayer: 'FALSE',
    playerCost: 1.5,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Emily Burch',
    playerPosition: 'defender',
    offensiveRank: 10,
    passRank: 10,
    defensiveRank: 25,
    overallRank: 15,
    sharkPlayer: 'FALSE',
    playerCost: 1.5,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Emmanuel Pierre',
    playerPosition: 'forward',
    offensiveRank: 20,
    passRank: 5,
    defensiveRank: 5,
    overallRank: 10,
    sharkPlayer: 'FALSE',
    playerCost: 1.5,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Sam Greenfeld',
    playerPosition: 'forward',
    offensiveRank: 20,
    passRank: 5,
    defensiveRank: 5,
    overallRank: 10,
    sharkPlayer: 'FALSE',
    playerCost: 1,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Theo Johnson',
    playerPosition: 'defender',
    offensiveRank: 5,
    passRank: 5,
    defensiveRank: 20,
    overallRank: 10,
    sharkPlayer: 'FALSE',
    playerCost: 1,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Taylor Roberts',
    playerPosition: 'forward',
    offensiveRank: 15,
    passRank: 5,
    defensiveRank: 10,
    overallRank: 10,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Sanit Xie',
    playerPosition: 'defender',
    offensiveRank: 5,
    passRank: 10,
    defensiveRank: 15,
    overallRank: 10,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Lindsay Finney',
    playerPosition: 'goalie',
    offensiveRank: null,
    passRank: null,
    defensiveRank: null,
    overallRank: 10,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Sofía Rosa',
    playerPosition: 'forward',
    offensiveRank: 10,
    passRank: 3,
    defensiveRank: 2,
    overallRank: 5,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Emily Burch',
    playerPosition: 'defender',
    offensiveRank: 2,
    passRank: 3,
    defensiveRank: 10,
    overallRank: 5,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Amit Saxena',
    playerPosition: 'goalie',
    offensiveRank: null,
    passRank: null,
    defensiveRank: null,
    overallRank: 5,
    sharkPlayer: 'FALSE',
    playerCost: null,
    playerAssignment: 'scoutPlayer',
    imageName: '',
    playerLevel: 1,
  },
  {
    playerName: 'Andrew Park',
    playerPosition: 'goalie',
    offensiveRank: null,
    passRank: null,
    defensiveRank: null,
    overallRank: 5,
    sharkPlayer: 'FALSE',
    playerCost: 0.5,
    playerAssignment: 'marketPlayer',
    imageName: '',
    playerLevel: 1,
  },
];

export const getPlayers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(players);
    }, 1000);
  });
};

export const getScoutState = () => {};

export const getScoutablePlayers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const _players = [];

      while (_players.length < 9) {
        const index = Math.floor(Math.random() * players.length);
        if (players[index] && _players.indexOf(players[index]) < 0) {
          _players.push(players[index]);
        }
      }
      resolve(_players);
    }, 3000);
  });
};
