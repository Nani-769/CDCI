import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemoVisitComponent } from './chemo-visit.component';

describe('ChemoVisitComponent', () => {
  let component: ChemoVisitComponent;
  let fixture: ComponentFixture<ChemoVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChemoVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChemoVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
