import { Action, createReducer, on } from '@ngrx/store';
import {
  increment,
  decrement,
  reset,
  incrementBy,
  undoLastAction,
} from './counter.action';

// Define the initial state for the counter
export interface CounterState {
  count: number;
  previousCount: number;
}
export const initialState: CounterState = {
  count: 0,
  previousCount: 0,
};

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({
    previousCount: state.count,
    count: state.count + 1,
  })),
  on(decrement, (state) => ({
    previousCount: state.count,
    count: state.count > 0 ? state.count - 1 : state.count,
  })),
  on(reset, (state) => ({ previousCount: state.count, count: 0 })),
  on(incrementBy, (state, { value }) => ({
    previousCount: state.count,
    count: state.count + value,
  })),
  on(undoLastAction, (state) => ({ ...state, count: state.previousCount }))
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return _counterReducer(state, action);
}
