import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaquetComponent } from './paquet.component';

describe('PaquetComponent', () => {
  let component: PaquetComponent;
  let fixture: ComponentFixture<PaquetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaquetComponent]
    });
    fixture = TestBed.createComponent(PaquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
