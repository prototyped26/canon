import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsMusicComponent } from './tools-music.component';

describe('ToolsMusicComponent', () => {
  let component: ToolsMusicComponent;
  let fixture: ComponentFixture<ToolsMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
