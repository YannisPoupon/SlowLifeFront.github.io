import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CreationArticleService } from '../services/creation-article.service';

@Component({
  selector: 'app-creation-article',
  templateUrl: './creation-article.component.html',
  styleUrls: ['./creation-article.component.css']
})
export class CreationArticleComponent implements OnInit {

  
formArt : any;
listArt : any;
BooleanForm : boolean =false;
currentUser: any;
contenantart: any;

  constructor(private arts:CreationArticleService) { }

  ngOnInit(): void {
    this.formArt=new FormGroup({
      idArticle : new FormControl(),
      nom : new FormControl(),
      typearticle : new FormControl(),
      prix : new FormControl(),
      quantiteDisponible : new FormControl(),
      producteur : new FormGroup({
        idUser : new FormControl() }),
      artisant : new FormGroup({
         idUser : new FormControl() }),
      commercant : new FormGroup({
         idUser : new FormControl()
  })
})
this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
if (this.currentUser.privilege == "Producteur"){
  this.getArticleByProd();
}else if (this.currentUser.privilege == "Artisant"){
  this.getArticleByArt();
}else if (this.currentUser.privilege == "Commercant"){
  this.getArticleByCom();
}

}

modifierArticle(coll :any){
 this.BooleanForm=true;

this.formArt.controls['idArticle'].setValue(coll.idArticle)
this.formArt.controls['nom'].setValue(coll.nom)
this.formArt.controls['typearticle'].setValue(coll.typearticle)

this.formArt.controls['prix'].setValue(coll.prix)
this.formArt.controls['quantiteDisponible'].setValue(coll.quantiteDisponible)
if (this.currentUser.privilege == "Producteur"){
this.formArt.controls['producteur'].controls['idUser'].setValue(coll.producteur.idUser)
}
else if (this.currentUser.privilege == "Artisant") {
this.formArt.controls['artisant'].controls['idUser'].setValue(coll.artisant.idUser)
}
else  {
this.formArt.controls['commercant'].controls['idUser'].setValue(coll.commercant.idUser)
}


}

ajoutArticle(){
  console.log(this.formArt.value)
  this.arts.ajoutArticle(this.formArt.value).subscribe/*(()=>{
  if (this.currentUser.privilege == "Producteur"){
    this.getArticleByProd();
  }else if (this.currentUser.privilege == "Artisant"){
    this.getArticleByArt();
  }else if (this.currentUser.privilege == "Commercant"){
    this.getArticleByCom();
  }})*/
  this.BooleanForm=false;
}
/*ajouterArticle(){
  console.log(this.currentUser)
  this.arts.ajoutArticle(this.formArt.value).subscribe(()=>{
    if (this.currentUser.privilege == "Producteur"){
      this.getArticleByProd();
    }else if (this.currentUser.privilege == "Artisant"){
      this.getArticleByArt();
    }else if (this.currentUser.privilege == "Commercant"){
      this.getArticleByCom();
    }})
}*/
/*
getArticle(){
this.arts.getArticle().subscribe((data)=>{
  this.listArt=data;
})
}*/
getArticleByProd(){
  this.arts.getArticleByProd(this.currentUser).subscribe((data)=>{
    this.listArt=data;
  })
}
getArticleByArt(){
  this.arts.getArticleByArt(this.currentUser).subscribe((data)=>{
    this.listArt=data;
  })
}
getArticleByCom(){
  this.arts.getArticleByCom(this.currentUser).subscribe((data)=>{
    this.listArt=data;
  })
}


deleteArticle(id : number){
this.arts.deleteArticle(id).subscribe(()=>{
if (this.currentUser.privilege == "Producteur"){
  this.getArticleByProd();
}else if (this.currentUser.privilege == "Artisant"){
  this.getArticleByArt();
}else if (this.currentUser.privilege == "Commercant"){
  this.getArticleByCom();
}}
)
}

updateArticle(){
  console.log(this.currentUser)
  console.log(this.formArt.value)
 //coll=this.contenantart
//this.arts.ajoutArticle(this.formArt.value)
this.ajoutArticle()
}

getProducteur(){
this.arts.getProducteur().subscribe((data)=>{
  this.listArt=data;
})
}
getArtisant(){
  this.arts.getArtisant().subscribe((data)=>{
    this.listArt=data;
  })
  }
  getCommercant(){
    this.arts.getCommercant().subscribe((data)=>{
      this.listArt=data;
    })
    }




}
