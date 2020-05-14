import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingestionannoncesComponent } from './admingestionannonces.component';

describe('AdmingestionannoncesComponent', () => {
  let component: AdmingestionannoncesComponent;
  let fixture: ComponentFixture<AdmingestionannoncesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmingestionannoncesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingestionannoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
