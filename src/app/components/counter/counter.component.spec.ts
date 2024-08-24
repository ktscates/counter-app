import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngrx/store';
import { CounterComponent } from './counter.component';
import { reducers } from '../../store/reducers';
import * as actions from '../../store/counter.action';
import * as type from '../../models/types';
import { counterReducer } from '../../store/counter.reducer';
import * as selector from '../../store/counter.selectors';
import { counterHistoryReducer } from '../../store/counter-history.reducer';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
      providers: [provideStore(reducers)],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize observables', () => {
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.count$).toBeTruthy();
  });

  it('should dispatch increment action ', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const value = 1;
    const action = actions.increment({ value });
    component.increment();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('[Counter] Increment');
  });

  it('should dispatch decrement action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const value = 1;
    const action = actions.decrement({ value });
    component.decrement();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('[Counter] Decrement');
  });

  it('should decrement the count and store the previous state when count is greater than 0', () => {
    const initialState: type.CounterState = {
      count: 10,
      previousStates: [0, 1, 5, 7, 9],
    };
    const value = 1;
    const action = actions.decrement({ value });
    const state = counterReducer(initialState, action);
    expect(state.count).toBe(9);
    expect(state.previousStates).toStrictEqual([0, 1, 5, 7, 9, 10]);
  });

  it('should dispatch reset action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const value = 0;
    const action = actions.reset({ value });
    component.reset();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('[Counter] Reset');
  });

  it('should dispatch incrementBy action with value', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const value = (component.incrementByValue = 5);
    const action = actions.incrementBy({ value });
    component.incrementBy();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('[Counter] Increment by');
    expect(action.value).toBe(value);
  });

  it('should dispatch undoLastAction action ', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const value = 1;
    const action = actions.undoLastAction({ value });
    component.undoLastAction();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('[Counter] Undo Last Action');
  });

  it('should undo the last action in counter reducer', () => {
    const initialState: type.CounterState = {
      count: 10,
      previousStates: [5, 7, 10],
    };
    const value = 1;
    const action = actions.undoLastAction({ value });
    const state = counterReducer(initialState, action);
    expect(state.count).toBe(10);
    expect(state.previousStates).toEqual([5, 7]);
  });

  it('should undo the last action in counter history reducer', () => {
    const initialState: type.CounterHistoryState = {
      history: [5, 7, 10],
    };
    const value = 1;
    const action = actions.undoLastAction({ value });
    const state = counterHistoryReducer(initialState, action);
    expect(state.history).toStrictEqual([5, 7]);
  });

  it('should select the history from CounterHistoryState', () => {
    const historyState: type.CounterHistoryState = {
      history: [1, 2, 3],
    };
    const appState: type.AppState = {
      count: {
        count: 5,
        previousStates: [4, 5],
      },
      previousStates: {
        count: 5,
        previousStates: [4, 5],
      },
      history: historyState,
    };
    const result = selector.selectHistory.projector(appState);
    expect(result.history).toStrictEqual([1, 2, 3]);
  });

  it('should select the previousStates from CounterState', () => {
    const historyState: type.CounterHistoryState = {
      history: [1, 2, 3],
    };
    const appState: type.AppState = {
      count: {
        count: 5,
        previousStates: [4, 5],
      },
      previousStates: {
        count: 5,
        previousStates: [4, 5],
      },
      history: historyState,
    };
    const result = selector.selectPreviousStates.projector(appState);
    expect(result.previousStates).toStrictEqual([4, 5]);
  });

  it('should set the count to value and save the current count', () => {
    const stateBefore: type.CounterState = {
      count: 10,
      previousStates: [1, 2, 3],
    };
    const value = 5;
    const action = actions.setEffects({ value });
    const result = counterReducer(stateBefore, action);
    const expectedState: type.CounterState = {
      count: value,
      previousStates: [...stateBefore.previousStates, stateBefore.count],
    };
    expect(result).toStrictEqual(expectedState);
  });

  it('should set the history to an array by adding the value', () => {
    const stateBefore: type.CounterHistoryState = {
      history: [1, 2, 3, 4],
    };
    const value = 5;
    const action = actions.setEffects({ value });
    const result = counterHistoryReducer(stateBefore, action);
    const expectedState: type.CounterHistoryState = {
      history: [...stateBefore.history, value],
    };

    expect(result).toStrictEqual(expectedState);
  });
});
