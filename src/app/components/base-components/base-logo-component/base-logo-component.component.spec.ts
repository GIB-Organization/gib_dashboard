import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLogoComponentComponent } from './base-logo-component.component';

describe('BaseLogoComponentComponent', () => {
  let component: BaseLogoComponentComponent;
  let fixture: ComponentFixture<BaseLogoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseLogoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseLogoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
