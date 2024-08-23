import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngrx/store';
import { of } from 'rxjs';
import { CounterComponent } from './counter.component';
import { reducers } from '../../store/reducers';
import {
  increment,
  decrement,
  reset,
  incrementBy,
  undoLastAction,
} from '../../store/counter.action';
import {
  selectCounter,
  selectHistory,
  selectPreviousStates,
} from '../../store/counter.selectors';
import { CounterState } from '../../store/counter.reducer';
import { CounterHistoryState } from '../../store/counter-history.reducer';

// Mock the selectors
jest.mock('../../store/counter.selectors', () => ({
  selectCounter: jest.fn(),
  selectHistory: jest.fn(),
  selectPreviousStates: jest.fn(),
}));

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let store: Store;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
      providers: [
        provideStore(reducers), // Adjust according to your actual state structure
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    consoleSpy = jest.spyOn(console, 'log');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize observables', () => {
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.count$).toBeTruthy();
    expect(component.history$).toBeTruthy();
    expect(component.previousState$).toBeTruthy();
  });

  it('should dispatch increment action ', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.increment();
    expect(dispatchSpy).toHaveBeenCalledWith(increment());
  });

  it('should dispatch decrement action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.decrement();
    expect(dispatchSpy).toHaveBeenCalledWith(decrement());
  });

  it('should dispatch reset action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.reset();
    expect(dispatchSpy).toHaveBeenCalledWith(reset());
  });

  it('should dispatch incrementBy action with value', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.incrementByValue = 5;
    component.incrementBy();
    expect(dispatchSpy).toHaveBeenCalledWith(incrementBy({ value: 5 }));
  });

  it('should dispatch undoLastAction action ', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.undoLastAction();
    expect(dispatchSpy).toHaveBeenCalledWith(undoLastAction());
  });
});
