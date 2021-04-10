import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../store/reducers/app.reducers';
import { WikipediaService } from '../wikipedia.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, StoreModule.forRoot(appReducers)],
      providers: [WikipediaService],
      declarations: [SearchComponent]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    fixture.detectChanges();
    console.log(el);
  });
});
