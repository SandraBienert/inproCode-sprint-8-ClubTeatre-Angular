import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMembersComponent } from './crud-members.component';

describe('CrudMembersComponent', () => {
  let component: CrudMembersComponent;
  let fixture: ComponentFixture<CrudMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
