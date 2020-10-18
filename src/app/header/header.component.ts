import { Store, select } from '@ngrx/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from '../store/state/app.state';
import { selectLoading } from '../store/selectors/selectors';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isThemeLight: boolean;
  @Output() toggleTheme = new EventEmitter();

  icon = '<i class="material-icons">brightness_2</i>';
  isLoading$: Observable<boolean> = this.store.pipe(select(selectLoading));
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  changeIcon(){
    this.icon = this.isThemeLight
      ? '<i class="material-icons">brightness_5</i>'
      : '<i class="material-icons">brightness_2</i>';

    this.toggleTheme.emit(!this.isThemeLight);
  }

}