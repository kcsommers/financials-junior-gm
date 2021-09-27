import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITeacherState {
  teacher: any;
}

const initialState: ITeacherState = {
  teacher: null,
};

const teacherStateSlice = createSlice({
  name: 'TEACHER_STATE',
  initialState,
  reducers: {
    setTeacher: (state, action: PayloadAction<any>) => {
      state.teacher = action.payload;
    },
  },
});

export const teacherStateReducer = teacherStateSlice.reducer;
export const { setTeacher } = teacherStateSlice.actions;
