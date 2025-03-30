import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeChatComponent } from './knowledge-chat.component';

describe('KnowledgeChatComponent', () => {
  let component: KnowledgeChatComponent;
  let fixture: ComponentFixture<KnowledgeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KnowledgeChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowledgeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
