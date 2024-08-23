import { createAction, props } from '@ngrx/store';

// Define action types as constants
export const INCREMENT = '[Counter] Increment';
export const DECREMENT = '[Counter] Decrement';
export const RESET = '[Counter] Reset';
export const INCREMENT_BY = '[Counter] Increment by';

// Implement actions for increment, decrement, and reset
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const reset = createAction(RESET);
export const incrementBy = createAction(
  INCREMENT_BY,
  props<{ value: number }>()
);
