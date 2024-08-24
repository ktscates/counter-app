import {
  decrement,
  increment,
  incrementBy,
  reset,
  undoLastAction,
} from '../store/counter.action';

export type CounterActions =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof reset>
  | ReturnType<typeof incrementBy>
  | ReturnType<typeof undoLastAction>;

export interface AppState {
  count: CounterState;
  previousStates: CounterState;
  history: CounterHistoryState;
}

export interface CounterState {
  count: number;
  previousStates: number[];
}

export interface CounterHistoryState {
  history: number[];
}
