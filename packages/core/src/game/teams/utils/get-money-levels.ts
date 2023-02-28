export type MoneyLevel = {
  amount: number;
  long: string;
  available: number;
  level: number;
};

export const getMoneyLevels = (level: number): MoneyLevel[] => {
  if (level === 1) {
    return [
      {
        long: 'three dollar',
        amount: 3,
        available: 1,
        level: 3,
      },
      {
        long: 'two dollar',
        amount: 2,
        available: 2,
        level: 2,
      },
      {
        long: 'one dollar',
        amount: 1,
        available: 3,
        level: 1,
      },
    ];
  }
  if (level === 2) {
    return [
      {
        long: 'thirty dollar',
        amount: 30,
        available: 1,
        level: 3,
      },
      {
        long: 'twenty dollar',
        amount: 20,
        available: 2,
        level: 2,
      },
      {
        long: 'ten dollar',
        amount: 10,
        available: 3,
        level: 1,
      },
    ];
  }
  if (level === 3) {
    return [
      {
        long: 'three hundred dollar',
        amount: 300,
        available: 1,
        level: 3,
      },
      {
        long: 'two hundred dollar',
        amount: 200,
        available: 2,
        level: 2,
      },
      {
        long: 'one hundred dollar',
        amount: 100,
        available: 3,
        level: 1,
      },
    ];
  }

  return [];
};
