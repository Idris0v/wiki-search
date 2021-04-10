import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../store/reducers/app.reducers';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers)],
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    component.isThemeLight = true;
  });

  it('should change icon to brightness_5', () => {
    expect(component.icon).toMatch('<i class="material-icons">brightness_2</i>');
    component.changeIcon();
    expect(component.icon).toMatch('<i class="material-icons">brightness_5</i>');
  });

  it('should change icon to brightness_2', () => {
    component.isThemeLight = false;
    component.changeIcon();
    expect(component.icon).toMatch('<i class="material-icons">brightness_2</i>');
  });

  it('should change theme to dark', () => {
    spyOn(component.toggleTheme, 'emit').and.callThrough();
    component.changeTheme();
    expect(component.toggleTheme.emit).toHaveBeenCalledWith(false);
  });
});
