import { Component, OnInit } from '@angular/core';
import { CounterComponent } from './components/counter/counter.component';
import { Store } from '@ngrx/store';
import { initEffects } from './store/counter.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'counter-app';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(initEffects());
  }
}
