import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterHistoryState } from './counter-history.reducer';
import { CounterState } from './counter.reducer';
import { AppState } from './reducers'; // Ensure correct path

// Create feature selectors
const selectCounterFeature = createFeatureSelector<AppState>('count');
const selectCounterHistoryFeature = createFeatureSelector<AppState>('history');

// Define selectors for CounterState
export const selectCounter = createSelector(
  selectCounterFeature,
  (state) => state.count
);

// Define selectors for CounterState
export const selectPreviousStates = createSelector(
  selectCounterFeature,
  (state) => state.previousStates
);

export const selectHistory = createSelector(
  selectCounterHistoryFeature,
  (state) => state.history
);
