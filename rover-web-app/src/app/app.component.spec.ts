import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('validateInitialPositionBounds() should be true', () => {
    app.initialPosition = "44N";
    app.dimension = 5;
    expect(app.validateInitialPositionBounds()).toBeTruthy();
  });

  it('validateInitialPositionBounds() should be false', () => {
    app.initialPosition = "55N";
    app.dimension = 5;
    expect(app.validateInitialPositionBounds()).toBeFalsy();
  });

  it('validateCommands() should be true', () => {
    app.commands = "LRM"
    expect(app.validateCommands()).toBeTruthy();
  });

  it('validateCommands() should be false', () => {
    app.commands = "LRMF"
    expect(app.validateCommands()).toBeFalsy();
  });

  it('validateInitialFormatPosition() should be true', () => {
    app.initialPosition = "33N"
    expect(app.validateInitialFormatPosition()).toBeTrue();
  });

  it('validateInitialFormatPosition() should be false', () => {
    app.initialPosition = "N33"
    expect(app.validateInitialFormatPosition()).toBeFalsy();
  });

  it('validateDimension() should be true', () => {
    app.dimension = 6
    expect(app.validateDimension()).toBeTruthy();
  });

  it('validateDimension() should be false', () => {
    app.dimension = 1
    expect(app.validateDimension()).toBeFalsy();
  });

  it('validateNewPosition() should update flags and recreate matrix', () => {
    app.newPositionFlag = true;
    app.invalidInitialPositionFlag = true;
    app.invalidInitialRoverCoordinates = true;
    app.dimension = 4;
    app.prevInitialPosition = '';
    app.initialPosition = '22N';
    app.validateNewPosition();
    expect(app.newPositionFlag).toBeFalsy();
    expect(app.invalidInitialPositionFlag).toBeFalsy();
    expect(app.invalidInitialRoverCoordinates).toBeFalsy();
    expect(app.cells.length == 4).toBeTruthy();
    expect(app.cells[0].length == 4).toBeTruthy();
  });

  it('reorientCoordinatesForRoverGraph() should update coordinate for rover grid dimensions', () => {
    app.originalYCoordinate = 4;
    app.originalXCoordinate = 4;
    app.dimension = 4;
    app.reorientCoordinatesForRoverGraph();
    expect(app.xCoordinate === 1).toBeTruthy();
    expect(app.yCoordinate === 1).toBeTruthy();
  });

  it('validateNewRoverCoordinates() should be within grid dimensions truthy', () => {
    app.originalXCoordinate = 4;
    app.originalXCoordinate = 4;
    app.dimension = 4;
    app.validateNewRoverCoordinates();
    expect(app.invalidRoverCoordinates).toBeTruthy();
  });

  it('validateNewRoverCoordinates() should be within grid dimensions falsy', () => {
    app.originalXCoordinate = 4;
    app.originalXCoordinate = 4;
    app.dimension = 5;
    app.validateNewRoverCoordinates();
    expect(app.invalidRoverCoordinates).toBeFalsy();
  });
});
