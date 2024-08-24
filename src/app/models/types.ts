import * as action from '../store/counter.action';

export type CounterActions =
  | ReturnType<typeof action.increment>
  | ReturnType<typeof action.decrement>
  | ReturnType<typeof action.reset>
  | ReturnType<typeof action.incrementBy>
  | ReturnType<typeof action.undoLastAction>
  | ReturnType<typeof action.initEffects>
  | ReturnType<typeof action.setEffects>;

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
