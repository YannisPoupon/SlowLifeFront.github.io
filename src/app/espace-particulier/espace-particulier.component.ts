import { Component, OnInit } from '@angular/core';
import { EspaceParticulierService } from '../services/espace-particulier.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { NgStyle, DatePipe } from '@angular/common';
import { CreationArticleService } from '../services/creation-article.service';
import { ChoixService } from '../services/choix.service';
import { ArticleService } from '../services/article.service';
import { MessageService } from 'primeng/api';
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
formFeed :any;
listChoix : any ;
listFeed: any;
Affiche: boolean=false;

  constructor(private partServ : EspaceParticulierService,
     private arts:CreationArticleService,
     private choixService:ChoixService,
     public datepipe: DatePipe, 
    private aServ : ArticleService,
     private messageService: MessageService,
     private feedb: FeedbackService
     ) { }

  ngOnInit(): void {
    this.total=0;
    this.testAchat=false;
    this.confirmed=false;
    this.validateButton=true;
    this.Article=false;

    
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
  

    this.listeFavoris = this.currentUser.articles
    console.log(this.listeFavoris)

//partie Feedback___________________
    console.log(this.currentUser);
    this.getChoixPart();
this.getListFeed();
  
    
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

  supprimerFavori(supFav : any) {

    this.index = this.listParticuliers.findIndex(x => x.idArticle === supFav.idArticle);
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
      this.aServ.findArticleById (this.Article.idArticle).subscribe((dataArt)=>{
        this.articlesListe=dataArt
        this.messageService.add({severity:'success', summary: 'Achat effectué', detail:'votre achat a été effectuté'});
        })
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
    this.formFeed.controls['userRecoit'].controls['idUser'].setValue(fee.article.producteur.idUser)
 }
  }

  ajoutFeedback(){
this.feedb.ajoutFeedback(this.formFeed.value).subscribe((data)=>console.log(data));
this.formFeed.reset();
this.getListFeed();
  }

getListFeed(){
  this.feedb.getAllFeedback().subscribe((data)=>{
    console.log(data)
   this.listFeed=data
   console.log(this.listFeed);
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