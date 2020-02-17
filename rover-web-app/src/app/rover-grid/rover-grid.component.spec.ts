import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverGridComponent } from './rover-grid.component';

describe('RoverGridComponent', () => {
  let component: RoverGridComponent;
  let fixture: ComponentFixture<RoverGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoverGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
