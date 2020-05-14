import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private http : HttpClient) { }

  connexion(User : any){
    return this.http.post("http://localhost:8080/connexion", User)
 }

 recupUser(User : any){
  return this.http.post("http://localhost:8080/recup", User)
}

}
