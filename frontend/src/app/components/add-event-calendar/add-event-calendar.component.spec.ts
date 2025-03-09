import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventCalendarComponent } from './add-event-calendar.component';

describe('AddEventCalendarComponent', () => {
  let component: AddEventCalendarComponent;
  let fixture: ComponentFixture<AddEventCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
