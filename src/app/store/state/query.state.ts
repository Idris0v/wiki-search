export interface IQuery {
  id: number;
  query: string;
}
export interface IQueryState {
  queries: IQuery[];
  currentQuery: IQuery;
}

export const initialQueryState: IQueryState = {
  queries: [{id: null, query: null}],
  currentQuery: null
}

export interface ILoading {
  isLoading: boolean;
}

export const initialLoadingState: ILoading = {
  isLoading: false
}