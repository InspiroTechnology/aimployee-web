import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMeidaManagementComponent } from './social-meida-management.component';

describe('SocialMeidaManagementComponent', () => {
  let component: SocialMeidaManagementComponent;
  let fixture: ComponentFixture<SocialMeidaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMeidaManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMeidaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
