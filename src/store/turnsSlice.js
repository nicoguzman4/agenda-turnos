import { createSlice } from '@reduxjs/toolkit';

const turnsSlice = createSlice({
  name: 'turns',
  initialState: [],
  reducers: {
    addTurn: (state, action) => {
      state.push(action.payload);
    },
    setTurns: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTurn, setTurns } = turnsSlice.actions;
export default turnsSlice.reducer;
