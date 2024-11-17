import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseBadgeComponentComponent } from './base-badge-component.component';

describe('BaseBadgeComponentComponent', () => {
  let component: BaseBadgeComponentComponent;
  let fixture: ComponentFixture<BaseBadgeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseBadgeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseBadgeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
