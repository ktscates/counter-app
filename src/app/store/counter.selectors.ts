import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../models/types';

// Create feature selectors
const selectCounterFeature = createFeatureSelector<AppState>('count');
const selectCounterHistoryFeature = createFeatureSelector<AppState>('history');

// Define selectors for CounterState
export const selectCounter = createSelector(
  selectCounterFeature,
  (state) => state.count
);

export const selectPreviousStates = createSelector(
  selectCounterFeature,
  (state) => state.previousStates
);

// Define selectors for CounterHistoryState
export const selectHistory = createSelector(
  selectCounterHistoryFeature,
  (state) => state.history
);
