import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

getArticleByNom(nom:string){
  return this.http.get("http://localhost:8080/getArticlesByNom/"+nom)
}

}
