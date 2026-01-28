import { createSlice } from '@reduxjs/toolkit';

const patientsSlice = createSlice({
  name: 'patients',
  initialState: [],
  reducers: {
    addPatient: (state, action) => {
      state.push(action.payload);
    },
    removePatient: (state, action) => {
      return state.filter(p => p.id !== action.payload);
    }
  }
});

export const { addPatient, removePatient } = patientsSlice.actions;
export default patientsSlice.reducer;
