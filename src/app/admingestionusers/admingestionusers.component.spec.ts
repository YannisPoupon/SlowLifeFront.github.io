import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingestionusersComponent } from './admingestionusers.component';

describe('AdmingestionusersComponent', () => {
  let component: AdmingestionusersComponent;
  let fixture: ComponentFixture<AdmingestionusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmingestionusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingestionusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
