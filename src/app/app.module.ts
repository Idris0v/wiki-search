import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { ErrorMessageComponent } from './header/error-message/error-message.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QueryEffects } from './store/effects/effects';
import { appReducers } from './store/reducers/app.reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent, DialogComponent } from './footer/footer/footer.component';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([QueryEffects]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    ErrorMessageComponent,
    FooterComponent,
    DialogComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: BASE_URL,
      useValue: 'https://ru.wikipedia.org/w/api.php?action=opensearch&'
    }
  ]
})
export class AppModule {}
