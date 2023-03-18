import ComericaLogo from '@statrookie/core/src/components/svg/comerica-logo.svg';
import { useState } from 'react';
import { Student } from '../../student/student.interface';
import { useAsyncState } from '../../utils/context/async-state.context';
import { BudgetSlider } from '../BudgetSlider';
import { Button } from '../Button';

type RollOverBudgetModalProps = {
  student: Student;
  onUseRollOverBudget: (newTotalBudget: number) => void;
};

export const RollOverBudgetModal = ({
  student,
  onUseRollOverBudget,
}: RollOverBudgetModalProps) => {
  const [rollOverToAdd, setRollOverToAdd] = useState(0);
  const { isLoading } = useAsyncState();

  return (
    <div className="w-full h-full flex items-center flex-col py-8">
      <div className="text-base flex flex-col items-center justify-center">
        <p className="text-foreground">Presented by</p>
        {/* @ts-ignore */}
        <ComericaLogo width="300px" />
        <p className="text-foreground w-[500px] text-center ">
          Move the yellow puck to the left to choose how much of your season's
          savings you want to add to you total budget. Then press the add to
          budget button. This money will be added to your total budget.
        </p>
      </div>
      <div className="-mt-20">
        <BudgetSlider
          budget={{
            totalBudget: +student.rollOverBudget,
            savingsBudget: +rollOverToAdd,
            moneySpent: 0,
          }}
          onSavingsChange={setRollOverToAdd}
          student={student}
          spendingLabel="Total Budget"
          totalDisplay={String(+student.totalBudget + +rollOverToAdd)}
        />
      </div>
      <div className="mt-8">
        <Button
          onClick={() => onUseRollOverBudget(+rollOverToAdd)}
          text="Add to Total Budget"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
