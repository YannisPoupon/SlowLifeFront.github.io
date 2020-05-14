import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnonceJobService {

  constructor(private http : HttpClient) { }

  addAnnonce(matiere : any){
    return this.http.post("http://localhost:8080/addAnnonce", matiere)
 }

 Annonces(){
    return this.http.get("http://localhost:8080/Annonces")
    
  }

  Annonce(id : any){
    return this.http.get("http://localhost:8080/Annonce/"+id)
    
  }

  delAnnonce(id : any){
    return this.http.delete("http://localhost:8080/delAnnonce/"+id);
  }

  findAnnonces(coord:any){
    return this.http.post("http://localhost:8080/findAnnonce/", coord);
  }

  
}

