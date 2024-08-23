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
  previousStates: number[];
}
export const initialState: CounterState = {
  count: 0,
  previousStates: [],
};

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({
    previousCount: state.count,
    count: state.count + 1,
    previousStates: [...state.previousStates, state.count],
  })),
  on(decrement, (state) => ({
    previousCount: state.count,
    count: state.count > 0 ? state.count - 1 : state.count,
    previousStates: [...state.previousStates, state.count],
  })),
  on(reset, (state) => ({
    count: 0,
    previousStates: [...state.previousStates, state.count],
  })),
  on(incrementBy, (state, { value }) => ({
    previousCount: state.count,
    count: state.count + value,
    previousStates: [...state.previousStates, state.count],
  })),
  on(undoLastAction, (state) => {
    if (state.previousStates.length > 0) {
      const previousState =
        state.previousStates[state.previousStates.length - 1];
      return {
        ...state,
        count: previousState,
        previousStates: state.previousStates.slice(0, -1),
      };
    }
    return state;
  })
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return _counterReducer(state, action);
}
