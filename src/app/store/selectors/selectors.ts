import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { IQueryState, ILoading } from '../state/query.state';

const selectUsers = (state: AppState) => state.queries;
const selectIsLoading = (state: AppState) => state.isLoading;

export const selectqueryList = createSelector(
    selectUsers,
    (state: IQueryState) => state.queries
);

export const selectLoading = createSelector(
    selectIsLoading,
    (state: ILoading) => state.isLoading
)