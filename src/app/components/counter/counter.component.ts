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
  incrementByValue: number = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.count$ = this.store.select(selector.selectCounter);
  }

  increment(): void {
    this.store.dispatch(actions.increment({ value: 1 }));
  }

  decrement(): void {
    this.store.dispatch(actions.decrement({ value: 1 }));
  }

  reset(): void {
    this.store.dispatch(actions.reset({ value: 0 }));
  }

  incrementBy(): void {
    this.store.dispatch(actions.incrementBy({ value: this.incrementByValue }));
  }

  undoLastAction(): void {
    this.store.dispatch(actions.undoLastAction({ value: 1 }));
  }
}
