import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspaceParticulierService {

  constructor(private Http : HttpClient) { }


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
  getAnnonce(){
    return this.Http.get("http://localhost:8080/Annonces");
  }
  getArticle(){
    return this.Http.get("http://localhost:8080/Articles");
  }

}
