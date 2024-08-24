import { Action, createReducer, on } from '@ngrx/store';
import { CounterHistoryState } from '../models/types';
import { CounterActions } from '../models/types';
import * as actions from './counter.action';

const initialState: CounterHistoryState = {
  history: [],
};

const _counterHistoryReducer = createReducer(
  initialState,
  on(actions.increment, (state, action) => ({
    history: [
      ...state.history,
      (state.history[state.history.length - action.value] || 0) + action.value,
    ],
  })),
  on(actions.decrement, (state, action) => ({
    history: [
      ...state.history,
      (state.history[state.history.length - action.value] || 0) - action.value,
    ],
  })),
  on(actions.reset, (state) => ({
    history: [...state.history, 0],
  })),
  on(actions.incrementBy, (state, { value }) => ({
    history: [
      ...state.history,
      (state.history[state.history.length - 1] || 0) + value,
    ],
  })),
  on(actions.undoLastAction, (state, action) => {
    if (state.history.length > 1) {
      return {
        history: state.history.slice(0, -action.value),
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
  return _counterHistoryReducer(state, action as CounterActions);
}
