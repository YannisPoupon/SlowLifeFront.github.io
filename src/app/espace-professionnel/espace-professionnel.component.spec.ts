import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceProfessionnelComponent } from './espace-professionnel.component';

describe('EspaceProfessionnelComponent', () => {
  let component: EspaceProfessionnelComponent;
  let fixture: ComponentFixture<EspaceProfessionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceProfessionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceProfessionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
