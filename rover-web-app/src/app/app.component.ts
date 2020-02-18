import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cells: string[][] = [];

  constructor() { }

  ngOnInit() {}

  updateRoverGrid($event) {
    this.cells = $event;
  }
}
