import { createAction, props } from '@ngrx/store';

// Define action types as constants
export const INCREMENT = '[Counter] Increment';
export const DECREMENT = '[Counter] Decrement';
export const RESET = '[Counter] Reset';
export const INCREMENT_BY = '[Counter] Increment by';
export const UNDO_LAST_ACTION = '[Counter] Undo Last Action';
//For Effects
export const INIT_EFFECTS = '[Counter] Init effects';
export const SET_EFFECTS = '[Counter] Set effects';

// Implement actions for increment, decrement, and reset
export const increment = createAction(INCREMENT, props<{ value: number }>());
export const decrement = createAction(DECREMENT, props<{ value: number }>());
export const reset = createAction(RESET, props<{ value: number }>());
export const incrementBy = createAction(
  INCREMENT_BY,
  props<{ value: number }>()
);
export const undoLastAction = createAction(
  UNDO_LAST_ACTION,
  props<{ value: number }>()
);
export const initEffects = createAction(INIT_EFFECTS);
export const setEffects = createAction(SET_EFFECTS, props<{ value: number }>());
