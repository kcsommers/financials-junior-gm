import { getMoneySpent } from '../../../game/utils/get-money-spent';
import { Student } from '../../../student/student.interface';
import { Budget } from '../budget';

export const getStudentBudget = (student: Student): Budget => {
  const totalBudget = +student?.totalBudget || 0;
  const savingsBudget = +student?.savingsBudget || 0;
  const moneySpent = getMoneySpent(student);

  return {
    totalBudget,
    savingsBudget,
    moneySpent,
    spendingBudget: totalBudget - savingsBudget - moneySpent,
  };
};
