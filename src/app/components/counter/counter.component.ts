import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from '../../store/counter.action';
import * as selector from '../../store/counter.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterState, CounterHistoryState } from '../../models/types';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent implements OnInit {
  count$!: Observable<CounterState>;
  history$!: Observable<CounterHistoryState>;
  previousState$!: Observable<CounterState>;
  incrementByValue: number = 1;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.count$ = this.store.select(selector.selectCounter);
    this.history$ = this.store.select(selector.selectHistory);
    this.previousState$ = this.store.select(selector.selectPreviousStates);
  }

  increment(): void {
    this.store.dispatch(actions.increment());
  }

  decrement(): void {
    this.store.dispatch(actions.decrement());
  }

  reset(): void {
    this.store.dispatch(actions.reset());
  }

  incrementBy(): void {
    this.store.dispatch(actions.incrementBy({ value: this.incrementByValue }));
  }

  undoLastAction(): void {
    this.store.dispatch(actions.undoLastAction());
  }
}
