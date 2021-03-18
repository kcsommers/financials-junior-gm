import { OverlayBoard, BudgetSlider, Button } from '@components';

export const RolloverBudgetOverlay = ({ student }) => {
  const updateRolloverBudget = (newAmount) => {
    console.log('NEW AMOUNT:::: ', newAmount);
  };

  const addToSavings = (newAmount) => {
    console.log('NEW AMOUNT:::: ', newAmount);
  };

  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '3rem 0 2rem 0',
        }}
      >
        <div className='rollover-budget-overlay-header-wrap'>
          <p>These are your savings from the previous season!</p>
          <p>
            When you run out of savings in your budget, move the yellow puck to
            pick how much money you want to use and click the orange button to
            add them to your savings.
          </p>
        </div>
        <div className='rollover-budget-slider-wrap'>
          <BudgetSlider
            budget={{
              total: +student.totalBudget,
              savings: +student.savingsBudget,
              spent: 0,
            }}
            setValue={updateRolloverBudget}
            student={student}
          />
        </div>
        <div>
          <Button onClick={addToSavings} text='Add to Savings' />
        </div>
      </div>
    </OverlayBoard>
  );
};
