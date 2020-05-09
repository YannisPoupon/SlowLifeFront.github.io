import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspaceParticulierService {

  constructor(private http : HttpClient) { }

  addParticulier(matiere : any){
    return this.http.post("http://localhost:8080/addParticulier", matiere)
 }

 Particuliers(){
    return this.http.get("http://localhost:8080/Particuliers")
    
  }

  Particulier(id : any){
    return this.http.get("http://localhost:8080/User/"+id)
    
  }

  delParticulier(id : any){
    return this.http.delete("http://localhost:8080/delParticulier/"+id);
  }
}


