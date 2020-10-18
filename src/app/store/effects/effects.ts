import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SetLoading, SetLoadingSuccess } from '../actions/actions';
import { map, switchMap, timeout } from 'rxjs/operators';

@Injectable()
export class QueryEffects {
    @Effect()
    setLoading$: Observable<Action> = this.actions$.pipe(
        ofType<SetLoading>('SET_LOADING'),
        map(r => r.payload),
        switchMap((status) => of(new SetLoadingSuccess(status)))
        );

    constructor(
        private actions$: Actions
    ) {}
}