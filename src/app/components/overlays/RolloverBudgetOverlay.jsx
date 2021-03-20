import { useState } from 'react';
import { OverlayBoard, BudgetSlider, Button } from '@components';
import { updateStudentById } from './../../api-helper';
import { batch, useDispatch } from 'react-redux';
import { toggleOverlay, setStudent } from '@redux/actions';

export const RolloverBudgetOverlay = ({ student }) => {
  const dispatch = useDispatch();
  const [rollOverToAdd, setRollOverToAdd] = useState(0);

  const addToSavings = () => {
    const newTotalBudget = +student.totalBudget + +rollOverToAdd;
    const newRollOverBudget = +student.rollOverBudget - +rollOverToAdd;

    updateStudentById(student._id, {
      totalBudget: newTotalBudget,
      rollOverBudget: newRollOverBudget,
    })
      .then((res) => {
        batch(() => {
          dispatch(setStudent(res.updatedStudent));
          dispatch(
            toggleOverlay({
              isOpen: false,
              template: null,
            })
          );
        });
      })
      .catch((err) => console.error(err));
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
            add it to your budget.
          </p>
        </div>
        <div className='rollover-budget-slider-wrap'>
          <BudgetSlider
            budget={{
              total: +student.rollOverBudget,
              savings: rollOverToAdd,
              spent: 0,
            }}
            setValue={setRollOverToAdd}
            student={student}
            spendingLabel='Rollover Budget'
          />
        </div>
        <div>
          <Button onClick={addToSavings} text='Add to Budget' />
        </div>
      </div>
    </OverlayBoard>
  );
};
