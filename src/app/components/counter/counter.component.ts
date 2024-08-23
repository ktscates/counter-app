import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterState } from '../../store/counter.reducer';
import { CounterHistoryState } from '../../store/counter-history.reducer';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  count$!: Observable<CounterState>;
  history$!: Observable<CounterHistoryState>;
  previousState$!: Observable<CounterState>;
  incrementByValue: number = 1;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.count$ = this.store.select(selectCounter);
    this.history$ = this.store.select(selectHistory);
    this.previousState$ = this.store.select(selectPreviousStates);
  }

  increment(): void {
    this.store.dispatch(increment());
  }

  decrement(): void {
    this.store.dispatch(decrement());
  }

  reset(): void {
    this.store.dispatch(reset());
  }

  incrementBy(): void {
    this.store.dispatch(incrementBy({ value: this.incrementByValue }));
  }

  undoLastAction(): void {
    this.store.dispatch(undoLastAction());
  }
}
