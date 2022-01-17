import { useState } from 'react';
import { OverlayBoard, BudgetSlider, Button } from '@components';
import { batch, useDispatch } from 'react-redux';
import { toggleOverlay, setStudent } from '@redux';
import comericaLogo from '@images/comerica-logo.svg';
import { ApiHelper } from '@statrookie/core';
import { BASE_URL } from 'app/api';

export const RolloverBudgetOverlay = ({ student }) => {
  const dispatch = useDispatch();
  const [rollOverToAdd, setRollOverToAdd] = useState(0);

  const addToSavings = () => {
    const newTotalBudget = +student.totalBudget + +rollOverToAdd;
    const newRollOverBudget = +student.rollOverBudget - +rollOverToAdd;

    ApiHelper.updateStudentById(BASE_URL, student._id, {
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
          padding: '2rem 0',
        }}
      >
        <div
          className="rollover-budget-overlay-header-wrap"
          style={{
            textAlign: 'center',
            fontSize: '0.95rem',
            lineHeight: '1.4rem',
          }}
        >
          <p
            style={{
              color: '#002f6d',
            }}
          >
            Presented by
          </p>
          <img
            style={{
              width: '300px',
              margin: '0.25rem 0 1rem 0',
            }}
            src={comericaLogo}
            alt="Comerica Savings Button"
          />
          <p
            style={{
              color: '#002f6d',
            }}
          >
            Move the yellow puck to the left to choose how much of your season's
            savings you want to add to you total budget. Then press the add to
            budget button. This money will be added to your total budget.
          </p>
        </div>
        <div
          style={{ marginTop: '-2rem' }}
          className="rollover-budget-slider-wrap"
        >
          <BudgetSlider
            budget={{
              total: +student.rollOverBudget,
              savings: rollOverToAdd,
              spent: 0,
            }}
            setValue={setRollOverToAdd}
            student={student}
            spendingLabel="Total Budget"
            totalDisplay={String(+student.totalBudget + +rollOverToAdd)}
          />
        </div>
        <div>
          <Button onClick={addToSavings} text="Add to Total Budget" />
        </div>
      </div>
    </OverlayBoard>
  );
};
