import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Meteor } from "../interfaces/meteors";

const dataUrl: string = " https://data.nasa.gov/resource/y77d-th95.json";

@Injectable({
  providedIn: "root"
})
export class GetMeteorsService {
  constructor(private http: HttpClient) {}

  getMeteorsData() {
    return this.http.get<Array<Meteor>>(dataUrl);
  }
}
