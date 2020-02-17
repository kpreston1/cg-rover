import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoverService {
  roverUrl = 'http://localhost:9000/v1/rover'

  constructor(private http: HttpClient) { }

  getNewPosition(initialPosition: String, commands: String) {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('content-type', 'application/json');
    return this.http.get(`${this.roverUrl}/location/${initialPosition}/commands/${commands}`, {headers})
  }
}
