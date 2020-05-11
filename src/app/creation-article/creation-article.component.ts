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
        idUser : new FormControl(),
        artisant : new FormGroup({
          idUser : new FormControl(),
          commercant : new FormGroup({
            idUser : new FormControl()
    })
  })
  })
})
this.getArticle();
//this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

}

/*modifierArticle(art :any){
 this.BooleanForm=true;
 this.contenantart = art;
}*/

ajoutArticle(){
  this.arts.ajoutArticle(this.formArt.value).subscribe(()=>this.getArticle())
}
getArticle(){
this.arts.getArticle().subscribe((data)=>{
  this.listArt=data;
})
}
deleteArticle(id : number){
this.arts.deleteArticle(id).subscribe(()=>this.getArticle())
}

updateArticle(coll:any){
 /* console.log(this.contenantart)
  this.formArt.value.idArticle =this.contenantart.idArticle
  console.log(this.formArt.value.idArticle)
  //this.formArt.value.prix =this.contenantart.prix
  this.formArt.controls['prix'].setValue(this.contenantart.prix)
  console.log(this.formArt.value.prix)*/
 
this.formArt.controls['idArticle'].setValue(coll.idArticle)
this.formArt.controls['nom'].setValue(coll.nom)
this.formArt.controls['typearticle'].setValue(coll.typearticle)
this.formArt.controls['prix'].setValue(coll.prix)
this.formArt.controls['quantiteDisponible'].setValue(coll.quantiteDisponible)
this.formArt.controls['producteur'].controls['idUser'].setValue(coll.producteur.idUser)
console.log(this.formArt.value)
this.arts.ajoutArticle(this.formArt.value)
//this.formArt.controls['artisant'].controls['idUser'].setValue(this.contenantart.artisant.idUser)
//this.formArt.controls['commercant'].controls['idUser'].setValue(this.contenantart.commercant.idUser)
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
