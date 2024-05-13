import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryLoseComponent } from './victory-lose.component';

describe('VictoryLoseComponent', () => {
  let component: VictoryLoseComponent;
  let fixture: ComponentFixture<VictoryLoseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VictoryLoseComponent]
    });
    fixture = TestBed.createComponent(VictoryLoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
