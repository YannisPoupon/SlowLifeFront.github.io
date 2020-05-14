import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CreationArticleService } from '../services/creation-article.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-creation-article',
  templateUrl: './creation-article.component.html',
  styleUrls: ['./creation-article.component.css']
})
export class CreationArticleComponent implements OnInit {

formNew:any;
formArt : any;
listArt : any;
BooleanForm : boolean =false;
currentUser: any;
contenantart: any;
ListeArticlesEnum:any;
ListeArticlesEnumData: any[] = [] ;
temp:any;
getTemp : any;


  constructor(private arts:CreationArticleService, private ass:ArticleService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (this.currentUser.privilege == "Producteur"){
      this.getArticleByProd();
      this.formArt=new FormGroup({
        idArticle : new FormControl(),
        nom : new FormControl(),
        typearticle : new FormControl(),
        prix : new FormControl(),
        quantiteDisponible : new FormControl(),
  
        producteur : new FormGroup({
          idUser : new FormControl() })
    })
    
    }else if (this.currentUser.privilege == "Artisant"){
      this.getArticleByArt();
      this.formArt=new FormGroup({
        idArticle : new FormControl(),
        nom : new FormControl(),
        typearticle : new FormControl(),
        prix : new FormControl(),
        quantiteDisponible : new FormControl(),

        artisant : new FormGroup({
           idUser : new FormControl() })
    })
    }else if (this.currentUser.privilege == "Commercant"){
      this.getArticleByCom();
    this.formArt=new FormGroup({
      idArticle : new FormControl(),
      nom : new FormControl(),
      typearticle : new FormControl(),
      prix : new FormControl(),
      quantiteDisponible : new FormControl(),

      commercant : new FormGroup({
         idUser : new FormControl()
  })
})}

this.getFruitsLegumes();
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

annulerModif(){
  this.BooleanForm=false;
}

ajoutArticle(){
  console.log(this.formArt.value)
  var lenom = this.formArt.value.nom.nom
  this.formArt.controls['nom'].setValue(lenom)
  this.arts.ajoutArticle(this.formArt.value).subscribe(()=>{
    if (this.currentUser.privilege == "Producteur"){
      this.getArticleByProd();
    }else if (this.currentUser.privilege == "Artisant"){
      this.getArticleByArt();
    }else if (this.currentUser.privilege == "Commercant"){
      this.getArticleByCom();
    }})
  this.BooleanForm=false;
  this.messageService.add({severity:'success', summary: 'Mise à jour carte', detail:"Vos modifications ont bien été prises en compte"});
}

nouvelArticle(){
  this.formArt.controls['nom'].setValue(this.formArt.value.nom.nom)
  console.log(this.formArt.value)
  this.formArt.controls['producteur'].controls['idUser'].setValue(this.currentUser.idUser)
  this.arts.ajoutArticle(this.formArt.value).subscribe(()=>{
    if (this.currentUser.privilege == "Producteur"){
      this.getArticleByProd();
    }else if (this.currentUser.privilege == "Artisant"){
      this.getArticleByArt();
    }else if (this.currentUser.privilege == "Commercant"){
      this.getArticleByCom();
    }})
}

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

//_______________Partie Enum du nom des produits_______________

searchArt(event) {
  let query = event.query;
  var ListeArt=this.ListeArticlesEnumData
  this.ListeArticlesEnum = this.filtrerArt(query, ListeArt);
}

filtrerArt(query, ListeArt: any[]):any[] {
  let filtered : any[] = [];
  for(let i = 0; i < ListeArt.length; i++) {
      let art = ListeArt[i];
      if (art.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(art);
      }
  }
  return filtered;
}

getFruitsLegumes(){
  this.ass.getFruitsLegumEnum().subscribe((data)=>{
    this.temp=data;
    for(var i=0;i<this.temp.length;i++){
      this.ListeArticlesEnumData[i]=({'nom':data[i]})
    } 
    this.ListeArticlesEnum=data;

  })
}
}
