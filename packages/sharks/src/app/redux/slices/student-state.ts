import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StudentState {
  student: any;
  startTime: any;
}

const initialState: StudentState = {
  student: null,
  startTime: null,
};

const studentStateSlice = createSlice({
  name: 'STUDENT_STATE',
  initialState,
  reducers: {
    setStudent: (state, action: PayloadAction<any>) => {
      state.student = action.payload;
    },
    updateStudent: (state, action: PayloadAction<any>) => {
      state.student = {
        ...state.student,
        ...action.payload,
      };
    },
    setSavings: (state, action: PayloadAction<any>) => {
      state.student.savingsBudget = action.payload;
    },
    setStartTime: (state) => {
      state.startTime = Date.now();
    },
  },
});

export const studentStateReducer = studentStateSlice.reducer;
export const { setStudent, updateStudent, setSavings, setStartTime } =
  studentStateSlice.actions;
