import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocalMasterComponent } from './protocal-master.component';

describe('ProtocalMasterComponent', () => {
  let component: ProtocalMasterComponent;
  let fixture: ComponentFixture<ProtocalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocalMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
