import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspaceParticulierService {

  constructor(private Http : HttpClient) { }


  getArtisant(){
    return this.Http.get("http://localhost:8080/Artisants");
  }
  getCommercant(){
    return this.Http.get("http://localhost:8080/Commercants");
  }
  getProducteur(){
    return this.Http.get("http://localhost:8080/Producteurs");
  }

  Artisant(id : any){
    return this.Http.get("http://localhost:8080/User/"+id)
  }
  Commercant(id : any){
    return this.Http.get("http://localhost:8080/User/"+id)
  }
  Producteur(id : any){
    return this.Http.get("http://localhost:8080/User/"+id)
  }


}
