import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreationAnnonceService {

  constructor(private Http : HttpClient) { }

  ajoutAnnonce(ann:any){
    return this.Http.post("http://localhost:8080/addAnnonce", ann);
  }
  getAnnonce(){
    return this.Http.get("http://localhost:8080/Annonces");

  }
  deleteAnnonce(id : any){
    return this.Http.delete("http://localhost:8080/delAnnonce/"+id);
   }
   Annonce(id : any){
    return this.Http.get("http://localhost:8080/Annonce/"+id)
  }
  getProducteur(){
    return this.Http.get("http://localhost:8080/Producteurs");
  }
getAnnonceByProd(prod:any){
  return this.Http.post("http://localhost:8080/findannoncebyprod", prod);
}
}
