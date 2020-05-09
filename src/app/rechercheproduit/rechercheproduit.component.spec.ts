import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheproduitComponent } from './rechercheproduit.component';

describe('RechercheproduitComponent', () => {
  let component: RechercheproduitComponent;
  let fixture: ComponentFixture<RechercheproduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheproduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
