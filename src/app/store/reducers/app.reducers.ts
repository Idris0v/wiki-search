import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { queryReducer, loadReducer } from './reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
    queries: queryReducer,
    isLoading: loadReducer,
}