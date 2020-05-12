import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiGeoGouvService {

  constructor(private https:HttpClient) { }

  getVillesList(){
    return this.https.get('https://geo.api.gouv.fr/communes')
  }
}
