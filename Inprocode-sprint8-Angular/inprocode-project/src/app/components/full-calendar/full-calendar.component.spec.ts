import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFullCalendarComponent } from './full-calendar.component';

describe('AppfullCalendarComponent', () => {
  let component: AppFullCalendarComponent;
  let fixture: ComponentFixture<AppFullCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFullCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFullCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
