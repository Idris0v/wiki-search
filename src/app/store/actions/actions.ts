import { Action } from '@ngrx/store'
import { IQuery } from '../state/query.state';

export const ADD_QUERY = 'ADD_QUERY'
export const REMOVE_QUERY = 'REMOVE_QUERY'
export const SET_LOADING = 'SET_LOADING'
export const SET_LOADING_SUCCESS = 'SET_LOADING_SUCCESS'

export class AddQuery implements Action {
  readonly type = ADD_QUERY
  constructor(public payload: IQuery) {}
}

export class RemoveQuery implements Action {
  readonly type = REMOVE_QUERY
  constructor(public payload: number) {}
}

export class SetLoading implements Action {
  readonly type = SET_LOADING
  constructor(public payload: boolean) {}
}

export class SetLoadingSuccess implements Action {
  readonly type = SET_LOADING_SUCCESS
  constructor(public payload: boolean) {}
}

export type Actions = AddQuery | RemoveQuery | SetLoading | SetLoadingSuccess