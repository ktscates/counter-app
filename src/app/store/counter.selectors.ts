import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterHistoryState } from './counterHistory';

export const selectCounter = createFeatureSelector<number>('count');
