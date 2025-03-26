import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnoledegeListComponent } from './knoledege-list.component';

describe('KnoledegeListComponent', () => {
  let component: KnoledegeListComponent;
  let fixture: ComponentFixture<KnoledegeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KnoledegeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnoledegeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
