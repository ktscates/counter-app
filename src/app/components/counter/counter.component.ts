import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  increment,
  decrement,
  reset,
  incrementBy,
} from '../../store/counter.action';
import { selectCounter } from '../../store/counter.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  count$!: Observable<number>;
  incrementByValue: number = 1;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.count$ = this.store.select(selectCounter);
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
}
