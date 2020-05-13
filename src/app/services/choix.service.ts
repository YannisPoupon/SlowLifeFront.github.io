import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChoixService {

  constructor(private http:HttpClient) { }

  addChoix(choix:any){
    return this.http.post("http://localhost:8080/addChoix",choix)
  }
}
