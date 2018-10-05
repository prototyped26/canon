import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarretLoaderComponent } from './carret-loader.component';

describe('CarretLoaderComponent', () => {
  let component: CarretLoaderComponent;
  let fixture: ComponentFixture<CarretLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarretLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarretLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
