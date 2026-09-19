import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickpageComponent } from './quickpage.component';

describe('QuickpageComponent', () => {
  let component: QuickpageComponent;
  let fixture: ComponentFixture<QuickpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
