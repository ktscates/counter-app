import { Action, createReducer, on } from '@ngrx/store';
import {
  increment,
  decrement,
  reset,
  incrementBy,
  undoLastAction,
} from './counter.action';

export interface CounterHistoryState {
  history: number[];
}

const initialHistoryState: CounterHistoryState = {
  history: [],
};

const _counterHistoryReducer = createReducer(
  initialHistoryState,
  on(increment, (state) => ({
    history: [...state.history, state.history[state.history.length - 1] + 1],
  })),
  on(decrement, (state) => ({
    history: [...state.history, state.history[state.history.length - 1] - 1],
  })),
  on(reset, (state) => ({ history: [...state.history, 0] })),
  on(incrementBy, (state, { value }) => ({
    history: [
      ...state.history,
      state.history[state.history.length - 1] + value,
    ],
  })),
  on(undoLastAction, (state) => {
    if (state.history.length > 1) {
      return {
        history: state.history.slice(0, -1),
      };
    } else {
      return state;
    }
  })
);

export function counterHistoryReducer(
  state: CounterHistoryState | undefined,
  action: Action
) {
  return _counterHistoryReducer(state, action);
}
