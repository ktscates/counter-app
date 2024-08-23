import { ActionReducerMap } from '@ngrx/store';
import { counterReducer, CounterState } from './counter.reducer';
import {
  counterHistoryReducer,
  CounterHistoryState,
} from './counter-history.reducer';

export interface AppState {
  count: CounterState;
  previousStates: CounterState;
  history: CounterHistoryState;
}

export const reducers: ActionReducerMap<AppState> = {
  count: counterReducer,
  previousStates: counterReducer,
  history: counterHistoryReducer,
};
