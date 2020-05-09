import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceParticulierComponent } from './espace-particulier.component';

describe('EspaceParticulierComponent', () => {
  let component: EspaceParticulierComponent;
  let fixture: ComponentFixture<EspaceParticulierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceParticulierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
