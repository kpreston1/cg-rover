import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RoverService} from "./rover.service";

@Component({
  selector: 'app-rover-input',
  templateUrl: './rover-input.component.html',
  styleUrls: ['./rover-input.component.css']
})
export class RoverInputComponent implements OnInit {
  @ViewChild('roverFileInput') roverFileInput: ElementRef;
  @Output() cellChangeEvent = new EventEmitter<string[][]>();
  initialPosition = '';
  prevInitialPosition = '';
  commands = '';
  cells: string[][] = [];
  dimension: number=5;
  prevDimension;
  xCoordinate: number;
  yCoordinate: number;
  originalXCoordinate: number;
  originalYCoordinate: number;
  direction = '';
  invalidDimensionFlag = false;
  invalidInitialPositionFlag = false;
  invalidCommandsFlag = false;
  newPositionFlag = false;
  invalidRoverCoordinates = false;
  invalidInitialRoverCoordinates = false;
  invalidFileUpload = false;
  fileToUpload: File = null;

  private dimensionCheck = /[2-9]/;
  private initialPositionCheck = /[0-9]{2}[NSEWnsew]/;
  private commandsCheck = /^[rRlLmM]+$/gm;

  constructor(private http: HttpClient, private roverService: RoverService) { }

  ngOnInit() {
    this.createRoverGrid();
    this.prevDimension = this.dimension;
    this.prevInitialPosition = this.initialPosition;
  }

  onSubmit() {
    this.validateInitialFormatPosition();
    this.validateInitialPositionBounds();
    if (!this.dimension) {
      this.invalidDimensionFlag = true;
    }
    if (!this.invalidInitialPositionFlag && !this.invalidInitialRoverCoordinates && !this.invalidDimensionFlag && !this.invalidCommandsFlag ) {
      this.getNewPosition();
    }
  }

  onDimensionChange() {
    this.createRoverGrid();
    this.resetPage();
  }

  resetRover() {
    this.resetPage();
    this.createRoverGrid();
    this.resetFileInput()
  }

  resetPage() {
    this.prevDimension = 0;
    this.xCoordinate = 0;
    this.yCoordinate = 0;
    this.direction = '';
    this.commands = '';
    this.initialPosition = '';
    this.resetFlags();
  }

  resetFileInput() {
    this.roverFileInput.nativeElement.value = null;
  }

  resetFlags() {
    this.invalidDimensionFlag = false;
    this.invalidInitialPositionFlag = false;
    this.invalidCommandsFlag = false;
    this.newPositionFlag = false;
    this.invalidRoverCoordinates = false;
    this.invalidInitialRoverCoordinates = false;
    this.invalidFileUpload = false;
  }

  resetCommandFlags() {
    this.invalidCommandsFlag = false;
    this.newPositionFlag = false;
  }

  createRoverGrid() {
    if (this.validateDimension()) {
      if (this.prevDimension != this.dimension || this.prevInitialPosition != this.initialPosition) {
        this.prevDimension = this.dimension
        this.cells = this.roverService.initializeRoverGrid(this.dimension);
      }
    } else {
      this.cells = []
    }
    this.cellChangeEvent.emit(this.cells);
  }

  getNewPosition(){
    this.invalidRoverCoordinates = false;
    this.roverService.getNewPosition(this.initialPosition, this.commands).subscribe((data: any[])=>{
      this.handleRoverLocationResponse(data['xCoordinate'], data['yCoordinate'], data['direction']);
    })
  }

  handleRoverLocationResponse(xCoordinate: string, yCoordinate: string, direction: string) {
    this.originalXCoordinate = Number(xCoordinate);
    this.originalYCoordinate = Number(yCoordinate);
    this.direction = direction;
    if (this.validateNewRoverCoordinates()) {
      this.reorientCoordinatesForRoverGraph();
      this.updateRoverPositionOnGrid();
      this.updateInitialPosition();
      this.updateFlagsOnSubmit();
    } else {
      this.newPositionFlag = false;
    }
  }

  validateNewRoverCoordinates() {
    this.invalidRoverCoordinates = this.originalXCoordinate < 0 || this.originalXCoordinate > this.dimension - 1 ||
      this.originalYCoordinate < 0 || this.originalYCoordinate > this.dimension - 1;
    return !this.invalidRoverCoordinates
  }

  reorientCoordinatesForRoverGraph() {
    this.xCoordinate = Math.abs(this.originalYCoordinate - (this.dimension - 1));
    this.yCoordinate = Math.abs(this.originalXCoordinate - (this.dimension - 1));
  }

  updateRoverPositionOnGrid() {
    this.cells[this.xCoordinate][this.yCoordinate] = this.direction;
  }

  updateInitialPosition() {
    this.initialPosition = `${this.originalXCoordinate}${this.originalYCoordinate}${this.direction.charAt(0)}`
  }

  updateFlagsOnSubmit() {
    this.commands = '';
    if (this.initialPosition != this.prevInitialPosition) {
      this.prevInitialPosition = this.initialPosition;
      this.newPositionFlag = true;
    }
  }

  validateNewPosition() {
    this.newPositionFlag = false;
    this.invalidInitialPositionFlag = false;
    this.invalidInitialRoverCoordinates = false;
    if (this.prevInitialPosition != this.initialPosition) {
      this.createRoverGrid();
    }
  }

  validateDimension() {
    this.invalidDimensionFlag = false;
    if(!this.dimension || !this.dimensionCheck.test(this.dimension.toString())) {
      this.invalidDimensionFlag = true;
      this.dimension = null;
    }
    return !this.invalidDimensionFlag;
  }

  validateInitialFormatPosition() {
    this.invalidInitialPositionFlag = this.initialPosition ? !this.initialPositionCheck.test(this.initialPosition) : true;
    return !this.invalidInitialPositionFlag;
  }

  validateInitialPositionBounds() {
    if(this.dimension > 1 && (this.initialPosition.length == 3 && (Number(this.initialPosition.charAt(0)) > this.dimension - 1) ||
      (Number(this.initialPosition.charAt(1)) > this.dimension - 1))) {
      this.invalidInitialRoverCoordinates = true;
    }
    return !this.invalidInitialRoverCoordinates;
  }

  validateCommands() {
    this.invalidCommandsFlag = this.commands ? !this.commandsCheck.test(this.commands) : true;
    return !this.invalidCommandsFlag;
  }

  handleFileInput(file: FileList) {
    this.resetPage();
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event) => {
      const file = event.target.result;
      const allLines = file.toString().split(/\r\n|\n/);
      this.validateFile(allLines);
    };
    reader.onerror = (event) => {
      this.invalidFileUpload = true;
    };
    reader.readAsText(this.fileToUpload);
  }

  validateFile(fileLines: string[]) {
    if(fileLines.length < 3) {
      this.invalidFileUpload = true;
    } else {
      const inputDimension = fileLines[0].replace(/ /g, '');
      const inputInitialPosition = fileLines[1].replace(/ /g, '');
      const inputCommands = fileLines[2].replace(/ /g, '');
      if(inputDimension.length > 0 && inputInitialPosition.length > 0 && inputCommands.length > 0) {
        this.dimension = Number(inputDimension[0]);
        this.initialPosition = inputInitialPosition;
        this.commands = inputCommands;
        this.createRoverGrid();
      } else {
        this.invalidFileUpload = true;
      }
    }
    this.resetFileInput();
  }

}
