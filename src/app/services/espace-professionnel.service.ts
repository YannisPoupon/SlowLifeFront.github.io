import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspaceParticulierService {

  constructor(private Http : HttpClient) { }


  Artisants(){
    return this.Http.get("http://localhost:8080/Artisants");
  }
  Commercants(){
    return this.Http.get("http://localhost:8080/Commercants");
  }
  Producteurs(){
    return this.Http.get("http://localhost:8080/Producteurs");
  }
  Annonces(){
    return this.Http.get("http://localhost:8080/Annonces");
  }
  Articles(){
    return this.Http.get("http://localhost:8080/Articles");
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
