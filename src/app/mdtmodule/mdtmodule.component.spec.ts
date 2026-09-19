import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdtmoduleComponent } from './mdtmodule.component';

describe('MdtmoduleComponent', () => {
  let component: MdtmoduleComponent;
  let fixture: ComponentFixture<MdtmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdtmoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdtmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
