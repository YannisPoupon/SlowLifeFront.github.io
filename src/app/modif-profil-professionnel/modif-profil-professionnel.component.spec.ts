import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifProfilProfessionnelComponent } from './modif-profil-professionnel.component';

describe('ModifProfilProfessionnelComponent', () => {
  let component: ModifProfilProfessionnelComponent;
  let fixture: ComponentFixture<ModifProfilProfessionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifProfilProfessionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifProfilProfessionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
