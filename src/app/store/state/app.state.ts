import { IQueryState, ILoading } from './query.state'

export interface AppState {
  readonly queries: IQueryState;
  readonly isLoading: ILoading;
}