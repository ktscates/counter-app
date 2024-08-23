import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, incrementBy } from './counter.action';

export interface CounterHistoryState {
  history: number[];
}

export const initialHistoryState: CounterHistoryState = {
  history: [],
};

export const _counterHistoryReducer = createReducer(
  initialHistoryState,
  on(increment, (state) => ({
    ...state,
    history: [...state.history, state.history[state.history.length - 1] + 1],
  })),
  on(decrement, (state) => ({
    ...state,
    history: [...state.history, state.history[state.history.length - 1] - 1],
  })),
  on(reset, (state) => ({ ...state, history: [0] })),
  on(incrementBy, (state, { value }) => ({
    ...state,
    history: [
      ...state.history,
      state.history[state.history.length - 1] + value,
    ],
  }))
);

export function counterHistoryReducer() {
  return _counterHistoryReducer;
}
