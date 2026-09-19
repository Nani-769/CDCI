import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdConsultComponent } from './opd-consult.component';

describe('OpdConsultComponent', () => {
  let component: OpdConsultComponent;
  let fixture: ComponentFixture<OpdConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdConsultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
