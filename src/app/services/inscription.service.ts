import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private Http : HttpClient) { }

  ajoutParticulier(user:any){
    return this.Http.post("http://localhost:8080/addParticulier", user);
  }
  ajoutArtisant(user:any){
    return this.Http.post("http://localhost:8080/addArtisant", user);
  }
  ajoutCommercant(user:any){
    return this.Http.post("http://localhost:8080/addCommercant", user);
  }
  ajoutProducteur(user:any){
    return this.Http.post("http://localhost:8080/addProducteur", user);
  }
  ajoutAdmin(user:any){
    return this.Http.post("http://localhost:8080/addAdmin", user);
  }
  getParticulier(){
    return this.Http.get("http://localhost:8080/Particuliers");
  }
  getArtisant(){
    return this.Http.get("http://localhost:8080/Artisants");
  }
  getCommercant(){
    return this.Http.get("http://localhost:8080/Commercants");
  }
  getProducteur(){
    return this.Http.get("http://localhost:8080/Producteurs");
  }
}
