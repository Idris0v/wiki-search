import { selectLoading, selectqueryList } from './../store/selectors/selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl} from '@angular/forms';
import { map, takeUntil, debounceTime, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, ReplaySubject,  } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state/app.state'
import * as Actions from '../store/actions/actions'
import { WikipediaService } from '../wikipedia.service';
import { Article, Card } from '../types'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  articles: Card[] = [];
  selectedSortType = 'relevance';
  searchValue = '';
  suggestions$: Observable<Article>;
  errorMessage$: Observable<string>;
  queryField: FormControl = new FormControl();
  queries$: Observable<any[]> = this.store.pipe(select(selectqueryList));
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(private _wikipediaService: WikipediaService, private store: Store<AppState>) {}

  ngOnInit() {
    const inputChange$ = this.queryField.valueChanges.pipe(
      debounceTime(300),
      map(result => result));
    this.suggestions$ = inputChange$.pipe(switchMap(resp =>
      this._wikipediaService.getArticles(resp)
        .pipe(map((response: Article[]) => response[1]))
    ));

    this.errorMessage$ = this._wikipediaService.getError();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  handleClick(value: string): void {
    this.store.dispatch(new Actions.SetLoading(true));
    if(value.length > 0)
      this._wikipediaService.getArticles(value)
        .pipe(takeUntil(this.destroy))
        .subscribe((articles: any[]) => {
          this.store.dispatch(new Actions.AddQuery({id: 4, query: value}));

          this.suggestions$ = EMPTY;
          this.searchValue = articles[0];
          articles.shift();
          if(articles[0].length > 0){
            this._wikipediaService.getImages(value)
              .pipe(takeUntil(this.destroy))
              .subscribe((images: any) => {
              this.articles = this.generateCards(articles, images.query.pages);
              this.errorMessage$ = new Observable((observer) => { observer.next(''); });
              this.store.dispatch(new Actions.SetLoading(false));
            })
          } else {
            this.articles = [];
            this.errorMessage$ = new Observable((observer) => { observer.next('Таких статей нет :('); });
          }
        })
  }

  handleChange(value: string): void {

    if(value.length > 0)
      this.suggestions$ = this._wikipediaService.getArticles(value)
        .pipe(map((response: any) => response[1]));
    else
      this.suggestions$ = EMPTY;
  }

  generateCards(articles, images): Card[] {
    const cards: Card[] = [];
    let image;

    for (let i = 0; i < articles[0].length; i++){
      image = images.find((img) => img.index - 1 === i);
      cards.push({
        id: i,
        name: articles[0][i],
        snippet: articles[1][i],
        link: articles[2][i],
        size: image.revisions[0].size,
        image: (image !== undefined && image.hasOwnProperty('thumbnail') === true)
          ? `<img src=${image.thumbnail.source} width="200" height="250" alt="No image">`
          :  ''
      })
    };

    return cards;
  }

  sortCards(type: any){
    if (this.articles)
      this.selectedSortType = type;
      switch(type){
        case 'descending':
          this.articles.sort((a, b) => a.size - b.size);
          break;
        case 'ascending':
          this.articles.sort((a, b) => b.size - a.size);
          break;
        default:
          this.articles.sort((a, b) => a.id - b.id);
      }
  }

  delQuery(id: number) {
    this.store.dispatch(new Actions.RemoveQuery(id));
  }
}