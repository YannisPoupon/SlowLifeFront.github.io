import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

findArticles(nom:string,ville:string){
  return this.http.get("http://localhost:8080/findArticles/"+nom+"/"+ville)
}

}
