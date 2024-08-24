import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../store/counter.action';
import * as selector from '../store/counter.selectors';
import { switchMap, tap, withLatestFrom, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class CounterEffects {
  loadCounts = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.initEffects),
      switchMap(() => {
        const storedCount = localStorage.getItem('count');
        if (storedCount) {
          return of(actions.setEffects({ value: +storedCount }));
        }
        return of(actions.setEffects({ value: 0 }));
      })
    )
  );

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
          console.log('action', action);
          localStorage.setItem('count', counter.toString());
          localStorage.setItem('previous states', previousStates.toString());
          localStorage.setItem('history counter', historyCounter.toString());
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store) {}
}
