import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../store/counter.action';
import * as selector from '../store/counter.selectors';
import { tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class CounterEffects {
  saveCounts = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actions.increment,
          actions.decrement,
          actions.reset,
          actions.incrementBy,
          actions.undoLastAction
        ),
        withLatestFrom(
          this.store.select(selector.selectCounter),
          this.store.select(selector.selectPreviousStates),
          this.store.select(selector.selectHistory)
        ),
        tap(([action, counter, previousStates, historyCounter]) => {
          console.log(action);
          console.log('count', counter);
          console.log('previous states', previousStates.toString());
          console.log('history counter', historyCounter.toString());
          localStorage.setItem('count', counter.toString());
          localStorage.setItem('previous states', previousStates.toString());
          localStorage.setItem('history counter', historyCounter.toString());
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store) {}
}
