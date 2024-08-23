import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { reducers } from './store/reducers';
import { provideStore } from '@ngrx/store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideStore(reducers)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain CounterComponent in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-counter')).not.toBeNull();
  });
});
