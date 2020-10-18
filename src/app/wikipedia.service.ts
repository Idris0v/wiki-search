import { Injectable, InjectionToken, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

import { Article } from './types';
import { BASE_URL } from './app-consts';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private _http: HttpClient) { }

  error$ = new BehaviorSubject<string>('');

  public getArticles(queryValue: string): Observable<Article[]> {
    return this._http.get<Article[]>(`${BASE_URL}action=opensearch&format=json&search=${queryValue}&prop=info&inprop=url&limit=10&origin=*`
    )
      .pipe(
        tap(_ => {
          this.error$.next("");
        }),
        catchError(this.handleError<Article[]>('Ошибка получения статей', []))
      );
  }

  public getImages(queryValue: string) {
    return this._http.get<Article[]>(`${BASE_URL}action=query&format=json&prop=pageimages%7Crevisions&rvprop=size&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=10&gpssearch=${queryValue}&gpslimit=10&origin=*`)
      .pipe(
        tap(_ => {
          this.error$.next("");
        }),
        catchError(this.handleError<Article[]>('Ошибка получения изображений', []))
      );
  }

  handleError<T> (operation = 'Ошибка', result: T) {
    return (error: any): Observable<T> => {
      this.error$.next(`${operation}: ${error.name}`);

      return of(result as T);
    };
  }
 
  getError(): Observable<string> {
    return this.error$.asObservable();
  }
}
