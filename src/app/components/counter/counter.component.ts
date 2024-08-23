import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  increment,
  decrement,
  reset,
  incrementBy,
} from '../../store/counter.action';
import { selectCounter, selectHistory } from '../../store/counter.selectors';
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
  incrementByValue: number = 1;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.count$ = this.store.select(selectCounter);
    this.history$ = this.store.select(selectHistory);
  }

  increment(): void {
    console.log('Increment button clicked');
    this.store.dispatch(increment());
  }

  decrement(): void {
    console.log('Decrement button clicked');
    this.store.dispatch(decrement());
  }

  reset(): void {
    console.log('Reset button clicked');
    this.store.dispatch(reset());
  }

  incrementBy(): void {
    console.log('IncrementBy button clicked');
    this.store.dispatch(incrementBy({ value: this.incrementByValue }));
  }
}
