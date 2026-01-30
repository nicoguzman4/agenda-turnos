import { createSlice } from '@reduxjs/toolkit';

const patientsSlice = createSlice({
  name: 'patients',
  initialState: [],
  reducers: {
    setPatients: (state, action) => {
      return action.payload;
    }
  }
});

export const { setPatients } = patientsSlice.actions;
export default patientsSlice.reducer;
