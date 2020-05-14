import { Component, OnInit } from '@angular/core';
import { EspaceParticulierService } from '../services/espace-particulier.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { NgStyle, DatePipe } from '@angular/common';
import { CreationArticleService } from '../services/creation-article.service';
import { ChoixService } from '../services/choix.service';
import { ArticleService } from '../services/article.service';
import { MessageService } from 'primeng/api';
import { InscriptionService } from '../services/inscription.service';
import { ConnexionService } from '../services/connexion.service';
import { FeedbackService } from '../services/feedback.service';



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
formFeed :any;
listChoix : any ;
listFeed: any;
listFeedIdChoix:any[]=[]; //Liste des Id Choix présents dans listFeed(liste des choix pour lesquels il y a un feedback)
Affiche: boolean=false;


  constructor(private partServ : EspaceParticulierService,
     private arts:CreationArticleService,
     private choixService:ChoixService,
     public datepipe: DatePipe, 
     private aServ : ArticleService,
     private messageService: MessageService,
     private is:InscriptionService,
     private conServ: ConnexionService,
     private feedb: FeedbackService

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
    this.formPart.controls['idUser'].setValue(this.currentUser.idUser)
    this.formPart.controls['nom'].setValue(this.currentUser.nom)
    this.formPart.controls['mail'].setValue(this.currentUser.mail)
  
    this.listeFavoris = []
    this.listeFavoris = this.currentUser.articles

//partie Feedback___________________
    this.getChoixPart();
    this.getListFeed()
    this.formFeed=new FormGroup({
      note : new FormControl(),
      commentaire : new FormControl(),
      choix : new FormGroup({
        idChoix : new FormControl()
      }),
      userDonne : new FormGroup({
        idUser : new FormControl()
      }),
      userRecoit : new FormGroup({
        idUser : new FormControl()
      })
    }) 
  }

  // supprimerFavori(supFav : any) {
  //   console.log(this.listeFavoris)
  //   this.index = this.listeFavoris.findIndex(x => x.idArticle === supFav.idArticle);
  //   console.log(this.index)
  //   this.listeFavoris.splice(this.index, 1);
  //   console.log(this.listeFavoris)
  // }

  supprimerFavori(fav : any){
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



    // if (fav.producteur.idUser=!null) {
    this.listeFavoris = this.currentUser.articles
    this.index = this.listeFavoris.findIndex(x => x.idArticle === fav.idArticle);
    this.listeFavoris.splice(this.index, 1);
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
      
    })
    this.messageService.add({severity:'success', summary: ' triste ', detail:'article supprimé des favoris'});
    }

  particulier(id : number){
    this.partServ.Particulier(id).subscribe((data) => {
      this.currentUser = data
    })
  }

  ajoutArticle(){
    this.arts.ajoutArticle(this.formPart.value).subscribe()
      
    }

  deconnexion() {
    localStorage.clear();
  }

// --------------- fonctions achat modal---------------------
  raz(){
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
      // this.aServ.findArticleById (this.Article.idArticle).subscribe((dataArt)=>{
      //   this.articlesListe=dataArt
      this.conServ.connexion(this.currentUser).subscribe((data: any) => {
        localStorage.setItem('currentUser', JSON.stringify(data))
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.listeFavoris = this.currentUser.articles
          }) 
        this.messageService.add({severity:'success', summary: 'Achat effectué', detail:'votre achat a été effectuté'});
        // })
    })
  }

  infosAnnonce(art:any){ 
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

  //___________________Partie feedback___________________

  getChoixPart(){
    this.feedb.getChoixPart(this.currentUser).subscribe((data)=>{
      this.listChoix=data;
  })
}
  donnerFeed(fee : any){
    this.verif(fee);
    if (!this.verif(fee)){
        this.formFeed.controls['choix'].controls['idChoix'].setValue(fee.idChoix)
        this.formFeed.controls['userDonne'].controls['idUser'].setValue(this.currentUser.idUser)
        if(fee.article.producteur.idUser != null){
          this.formFeed.controls['userRecoit'].controls['idUser'].setValue(fee.article.producteur.idUser)
        }else if(fee.article.artisant.idUser != null){
          this.formFeed.controls['userRecoit'].controls['idUser'].setValue(fee.article.artisant.idUser)
        }else if(fee.article.commercant.idUser != null){
          this.formFeed.controls['userRecoit'].controls['idUser'].setValue(fee.article.commercant.idUser)
        }else{
          console.log("ERREUR : IDUSER");
        }
        
    }
  }

  ajoutFeedback(){
    this.feedb.ajoutFeedback(this.formFeed.value).subscribe((data)=>{
      console.log(data)
      this.getListFeed();      
    });
    this.formFeed.reset();
    
  }

getListFeed(){
  this.feedb.getAllFeedback().subscribe((data)=>{
  this.listFeed=data
  this.listFeedIdChoix
  for(var i = 0;i<this.listFeed.length;i++){
    this.listFeedIdChoix.push(this.listFeed[i].choix.idChoix)
  }
   console.log(this.listFeedIdChoix);
  });
}

verif(ch: any){
  var present  =false;
  for (var i=0 ; i < this.listFeed.length ; i++){
    if (ch.idChoix == this.listFeed[i].choix.idChoix){
      present=true;
      
    }
  }
  return present;
}


}