import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModifProfilProfessionnelService {

  constructor(private Http : HttpClient) { }

  
 
  ajoutArtisant(user:any){
    return this.Http.post("http://localhost:8080/addArtisant", user);
  }
  ajoutCommercant(user:any){
    return this.Http.post("http://localhost:8080/addCommercant", user);
  }
  ajoutProducteur(user:any){
    return this.Http.post("http://localhost:8080/addProducteur", user);
  }
  getProducteur(){
    return this.Http.get("http://localhost:8080/Producteurs");
  }
  getArtisant(){
    return this.Http.get("http://localhost:8080/Artisants");
  }
  getCommercant(){
    return this.Http.get("http://localhost:8080/Commercants");
  }
}
