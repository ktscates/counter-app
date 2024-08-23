import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterHistoryState } from './counterHistory';
import { CounterState } from './counter.reducer';

// Create a feature selector for the CounterState
const selectCounterFeature = createFeatureSelector<CounterState>('count');

// Define selectors to get specific parts of the CounterState
export const selectCounter = createSelector(
  selectCounterFeature,
  (state: CounterState) => state.count
);

export const selectHistory = createSelector(
  selectCounterFeature,
  (state: CounterState) => state.history
);
