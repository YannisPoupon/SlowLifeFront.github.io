import { Component, OnInit } from '@angular/core';
import { EspaceParticulierService } from '../services/espace-particulier.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgStyle, DatePipe } from '@angular/common';
import { CreationArticleService } from '../services/creation-article.service';
import { ChoixService } from '../services/choix.service';
import { ArticleService } from '../services/article.service';
import { MessageService } from 'primeng/api';
import { InscriptionService } from '../services/inscription.service';
import { ConnexionService } from '../services/connexion.service';


@Component({
  selector: 'app-espace-particulier',
  templateUrl: './espace-particulier.component.html',
  styleUrls: ['./espace-particulier.component.css']
})
export class EspaceParticulierComponent implements OnInit {
currentUser : any;
listParticuliers : any;
formPart : any;
listeFavoris : any;
index : any;
testAchat : any;
confirmed : any;
validateButton : any;
Article : any;
total :any;
nombre:any;
achatForm : any;
articlesListe:any;
idFav:any;
nom :any;
newFav : any;
newItem : any;
  constructor(private partServ : EspaceParticulierService,
     private arts:CreationArticleService,
     private choixService:ChoixService,
     public datepipe: DatePipe, 
    private aServ : ArticleService,
     private messageService: MessageService,
     private is:InscriptionService,
     private conServ: ConnexionService
     ) { }

  ngOnInit(): void {
    this.total=0;
    this.testAchat=false;
    this.confirmed=false;
    this.validateButton=true;
    this.Article=false;

    this.newItem = [];

    this.newFav = new FormGroup ({
      idUser : new FormControl(),
      login : new FormControl(),
      password : new FormControl(),
      mail : new FormControl(),
      nom : new FormControl(),
      prenom : new FormControl(),
      numero : new FormControl(),
      rue : new FormControl(),
      ville : new FormControl(),
      departement : new FormControl(),
      longitude : new FormControl(),
      latitude : new FormControl(),
      feedbacksD: new FormControl(),
      feedbacksR: new FormControl(),
      privilege: new FormControl(),
      articles : new FormControl()
    })
    
    this.achatForm=new FormGroup({
      dateAchat:new FormControl,
      quantite:new FormControl,
      particulier:new FormGroup({
        idUser:new FormControl
      }),

      article:new FormGroup({
        idArticle:new FormControl
      })

    })
    
    this.formPart = new FormGroup({
      idUser : new FormControl(),
      nom : new FormControl(),
      prenom : new FormControl(),
      mail : new FormControl(),
       article : new FormGroup ({
        idArticle : new FormControl(),
        producteur : new FormGroup ({
          idProducteur : new FormControl()
        })
      })
    })
     

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser)

    this.formPart.controls['idUser'].setValue(this.currentUser.idUser)
    this.formPart.controls['nom'].setValue(this.currentUser.nom)
    this.formPart.controls['mail'].setValue(this.currentUser.mail)
  
    this.listeFavoris = []
    this.listeFavoris = this.currentUser.articles
    console.log(this.listeFavoris)

  }

  // supprimerFavori(supFav : any) {
  //   console.log(this.listeFavoris)
  //   this.index = this.listeFavoris.findIndex(x => x.idArticle === supFav.idArticle);
  //   console.log(this.index)
  //   this.listeFavoris.splice(this.index, 1);
  //   console.log(this.listeFavoris)
  // }

  supprimerFavori(fav : any){
    console.log(this.currentUser) 
    this.newFav.controls['idUser'].setValue(this.currentUser.idUser)
    this.newFav.controls['login'].setValue(this.currentUser.login)
    this.newFav.controls['password'].setValue(this.currentUser.password)
    this.newFav.controls['mail'].setValue(this.currentUser.mail)
    this.newFav.controls['nom'].setValue(this.currentUser.nom)
    this.newFav.controls['prenom'].setValue(this.currentUser.prenom)
    this.newFav.controls['numero'].setValue(this.currentUser.numero)
    this.newFav.controls['rue'].setValue(this.currentUser.rue)
    this.newFav.controls['ville'].setValue(this.currentUser.ville)
    this.newFav.controls['departement'].setValue(this.currentUser.departement)
    this.newFav.controls['latitude'].setValue(this.currentUser.latitude)
    this.newFav.controls['longitude'].setValue(this.currentUser.longitude)
    this.newFav.controls['feedbacksD'].setValue(this.currentUser.feedbacksD)
    this.newFav.controls['feedbacksR'].setValue(this.currentUser.feedbacksD)
    this.newFav.controls['privilege'].setValue(this.currentUser.privilege)
    this.newFav.controls['articles'].setValue(this.currentUser.articles)

    console.log(this.newFav.value)
    console.log(fav.idArticle)


    // if (fav.producteur.idUser=!null) {
    this.listeFavoris = this.currentUser.articles
    console.log(this.listeFavoris)
    this.index = this.listeFavoris.findIndex(x => x.idArticle === fav.idArticle);
    console.log(this.index)
    this.listeFavoris.splice(this.index, 1);
    console.log(this.listeFavoris)
    this.newFav.controls['articles'].setValue(this.listeFavoris)
    // }
    // else if (fav.commercant.idUser!=null) {
    //   this.newItem.push({idArticle : fav.idArticle, nom : fav.nom, typearticle : fav.typearticle
    //     , prix : fav.prix, quantiteDisponible : fav.quantiteDisponible, commercant : { idUser : fav.commercant.idUser}})
    // } else if (fav.artisant.idUser!=null) {
    //   this.newItem.push({idArticle : fav.idArticle, nom : fav.nom, typearticle : fav.typearticle
    //     , prix : fav.prix, quantiteDisponible : fav.quantiteDisponible, artisant : { idUser : fav.artisant.idUser}})
    // }
    
    // console.log(this.favItems.value)
    // this.newFav.controls['articles'].setValue(this.favItems)
    
    this.is.ajoutParticulier(this.newFav.value).subscribe(() => {
    this.conServ.connexion(this.newFav.value).subscribe((data: any) => {
    localStorage.setItem('currentUser', JSON.stringify(data))
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.listeFavoris = this.currentUser.articles
      }) 
      console.log(this.currentUser)
      
    })
    this.messageService.add({severity:'success', summary: ' triste ', detail:'article supprimé des favoris'});
    }

  particulier(id : number){
    this.partServ.Particulier(id).subscribe((data) => {
      this.currentUser = data
    })
  }

  ajoutArticle(){
    console.log(this.formPart.value)
    this.arts.ajoutArticle(this.formPart.value).subscribe()
      
    }

  deconnexion() {
    localStorage.clear();
  }

// --------------- fonctions achat modal---------------------
  raz(){
    console.log("nice");
    this.achatForm.reset()
    this.total=0;
    this.validateButton=true;
    this.testAchat=false;
    this.confirmed=false;
  }

  valider(){
    if((this.nombre>0 && this.nombre<= this.Article.quantiteDisponible)){
      this.testAchat=false;
      this.validateButton=false;
    }else{
      this.testAchat=true;
    }
  }

  confirmerAchat(){
    //var qtiteRestant = this.Article.quantiteDisponible - this.nombre
  
    var idArticle = this.Article.idArticle
    var idUser = JSON.parse(localStorage.getItem('currentUser')).idUser
    var date = this.datepipe.transform(new Date(), 'yyyy-MM-dd')
  
    this.achatForm.controls['dateAchat'].setValue(date)
    this.achatForm.controls['particulier'].controls['idUser'].setValue(idUser)
    this.achatForm.controls['article'].controls['idArticle'].setValue(idArticle)
  
    this.choixService.addChoix(this.achatForm.value).subscribe(()=>{
      console.log("achat éffectué")
      // this.aServ.findArticleById (this.Article.idArticle).subscribe((dataArt)=>{
      //   this.articlesListe=dataArt
      this.conServ.connexion(this.currentUser).subscribe((data: any) => {
        localStorage.setItem('currentUser', JSON.stringify(data))
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.listeFavoris = this.currentUser.articles
          }) 
        this.messageService.add({severity:'success', summary: 'Achat effectué', detail:'votre achat a été effectuté'});
        // })
        console.log(this.listeFavoris)
    })
  }

  infosAnnonce(art:any){ 
    console.log(art);
    this.nom=art.producteur.nom
    this.Article=art;
  }

  calcul(event:any){
    this.validateButton=true;
    this.testAchat=false;
    this.nombre = event.target.value
    var nb=this.nombre
    var prix = this.Article.prix
    this.total = nb * prix
    
  }

}
