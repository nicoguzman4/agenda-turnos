import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from './patientsSlice';
import turnsReducer from './turnsSlice';

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    turns: turnsReducer,
  },
});
