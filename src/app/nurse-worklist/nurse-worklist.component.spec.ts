import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseWorklistComponent } from './nurse-worklist.component';

describe('NurseWorklistComponent', () => {
  let component: NurseWorklistComponent;
  let fixture: ComponentFixture<NurseWorklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseWorklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseWorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
