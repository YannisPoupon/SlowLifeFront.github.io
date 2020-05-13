import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreationArticleService {

  constructor(private Http : HttpClient) { }

  ajoutArticle(art:any){
    return this.Http.post("http://localhost:8080/addArticle", art);
  }
  getArticle(){
    return this.Http.get("http://localhost:8080/Articles");
  }
  deleteArticle(id : any){
    return this.Http.delete("http://localhost:8080/delArticle/"+id);
   }
   Article(id : any){
    return this.Http.get("http://localhost:8080/Article/"+id)
  }
  getProducteur(){
    return this.Http.get("http://localhost:8080/Producteurs");
  }
  getArtisant(){
    return this.Http.get("http://localhost:8080/Artisants");
  }
  getCommercant(){
    return this.Http.get("http://localhost:8080/Commercants");
  }
getArticleByProd(prod : any){
  return this.Http.post("http://localhost:8080/findarticlebyprod", prod);
}
getArticleByArt(art : any){
  return this.Http.post("http://localhost:8080/findarticlebyart", art);
}
getArticleByCom(com : any){
  return this.Http.post("http://localhost:8080/findarticlebycom", com);
}
}
