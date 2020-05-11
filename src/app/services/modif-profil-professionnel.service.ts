import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModifProfilProfessionnelService {

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
}
