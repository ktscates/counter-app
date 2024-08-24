import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { counterHistoryReducer } from './counter-history.reducer';
import { AppState } from '../models/types';

export const reducers: ActionReducerMap<AppState> = {
  count: counterReducer,
  previousStates: counterReducer,
  history: counterHistoryReducer,
};
