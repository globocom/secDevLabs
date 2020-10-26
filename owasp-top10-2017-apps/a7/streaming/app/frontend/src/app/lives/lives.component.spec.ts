import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesComponent } from './lives.component';

describe('LivesComponent', () => {
  let component: LivesComponent;
  let fixture: ComponentFixture<LivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
