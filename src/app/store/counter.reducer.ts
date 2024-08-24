import { Action, createReducer, on } from '@ngrx/store';
import { CounterActions, CounterState } from '../models/types';
import * as actions from './counter.action';

// Define the initial state for the counter
export const initialState: CounterState = {
  count: 0,
  previousStates: [],
};

const _counterReducer = createReducer(
  initialState,
  on(actions.increment, (state, action) => ({
    count: state.count + action.value,
    previousStates: [...state.previousStates, state.count],
  })),
  on(actions.decrement, (state, action) => ({
    count: state.count > 0 ? state.count - action.value : state.count,
    previousStates: [...state.previousStates, state.count],
  })),
  on(actions.reset, (state, action) => ({
    count: action.value,
    previousStates: [...state.previousStates, state.count],
  })),
  on(actions.incrementBy, (state, { value }) => ({
    count: state.count + value,
    previousStates: [...state.previousStates, state.count],
  })),
  on(actions.undoLastAction, (state, action) => {
    if (state.previousStates.length > 0) {
      const previousState =
        state.previousStates[state.previousStates.length - action.value];
      return {
        ...state,
        count: previousState,
        previousStates: state.previousStates.slice(0, -action.value),
      };
    }
    return state;
  }),
  on(actions.setEffects, (state, action) => ({
    count: action.value,
    previousStates: [...state.previousStates, state.count],
  }))
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return _counterReducer(state, action as CounterActions);
}
