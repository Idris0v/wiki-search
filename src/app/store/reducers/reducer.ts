import { Action } from '@ngrx/store'

import { initialQueryState, initialLoadingState, ILoading, IQueryState } from '../state/query.state'
import * as QueryActions from '../actions/actions'

export function queryReducer(state: IQueryState = initialQueryState, action: QueryActions.Actions) {

    switch(action.type) {
        case QueryActions.ADD_QUERY:
          return {...state, queries: [...state.queries, action.payload] };
        case QueryActions.REMOVE_QUERY:
          return {...state, queries: state.queries.filter(query => query.id !== action.payload) }
        default:
          return state;
    }
}

export function loadReducer(state: ILoading = initialLoadingState, action: QueryActions.Actions) {

    switch(action.type) {
        case QueryActions.SET_LOADING_SUCCESS:
          return {...state, isLoading: action.payload};

        default:
          return state;
    }
}