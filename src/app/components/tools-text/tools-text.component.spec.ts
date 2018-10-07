import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsTextComponent } from './tools-text.component';

describe('ToolsTextComponent', () => {
  let component: ToolsTextComponent;
  let fixture: ComponentFixture<ToolsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
