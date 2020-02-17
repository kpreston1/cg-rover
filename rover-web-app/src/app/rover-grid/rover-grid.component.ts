import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rover-grid',
  templateUrl: './rover-grid.component.html',
  styleUrls: ['./rover-grid.component.css']
})
export class RoverGridComponent {

  @Input() value: string;
  @Input() direction: string;
}
