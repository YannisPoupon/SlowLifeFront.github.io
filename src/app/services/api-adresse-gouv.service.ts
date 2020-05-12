import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAdresseGouvService {

  constructor(private https:HttpClient) { }

  getAdresse(lat:any,lng:any){
    return this.https.get('https://api-adresse.data.gouv.fr/reverse/?lat='+lat+'&lon='+lng)
  }
}
