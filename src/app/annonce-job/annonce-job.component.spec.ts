import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceJobComponent } from './annonce-job.component';

describe('AnnonceJobComponent', () => {
  let component: AnnonceJobComponent;
  let fixture: ComponentFixture<AnnonceJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
