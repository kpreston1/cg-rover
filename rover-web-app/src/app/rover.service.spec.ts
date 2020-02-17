import {async, TestBed} from '@angular/core/testing';

import { RoverService } from './rover.service';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";

describe('RoverService', () => {
  let service: RoverService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    service = TestBed.inject(RoverService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initializeRoverGrid should create 5x5 array', () => {
    const roverGrid = service.initializeRoverGrid(5);
    expect(roverGrid.length == 5).toBeTruthy();
    expect(roverGrid[0].length == 5).toBeTruthy();
  });
});
