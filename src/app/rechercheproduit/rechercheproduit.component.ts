import { Component, OnInit } from '@angular/core';
import {GMapModule} from 'primeng/gmap';

import { FormGroup, FormControl } from '@angular/forms';
import { google } from "google-maps";
import { ArticleService } from '../services/article.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { ApiGeoGouvService } from '../services/api-geo-gouv.service';
import { ApiAdresseGouvService } from '../services/api-adresse-gouv.service';
import { ChoixService } from '../services/choix.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-rechercheproduit',
  templateUrl: './rechercheproduit.component.html',
  styleUrls: ['./rechercheproduit.component.css']
})
export class RechercheproduitComponent implements OnInit {
  articlesListe:any; //Utilisé pour les résultats de la recherche=>Liste d'objets "Article"
  ListeArticlesEnum:any; //Utilisé pour l'input de recherche => Liste de String fruits, legumes
  ListeArticlesEnumData:any[]=[];
  temp:any;
  maVille:any;
  rechercheForm:any;
  overlays: any[];
  google : google;
  infoWindow: any;
  enableGeoLoc=false;
  myLat:any;
  myLng:any;
  map:any;
  dataVilles:any;
  NomsVilles:string[]=[];
  center={lat: 47.092901, lng: 2.388634};
  options = {
    center: this.center,
    zoom: 5.8
  };
  afficher=true;
  connected:any;
  Article:any;
  nom:any;
  testAchat:any;
  confirmed:any;
  total:any;
  validateButton:any;
  achatForm:any;
  nombre:any;
  produitRECHERCHE;
  villeRECHERCHE;

  constructor(private aServ:ArticleService, 
    private messageService: MessageService, 
    private apiGeoGouv:ApiGeoGouvService,
    private apiAdresseGouv:ApiAdresseGouvService,
    private choixService:ChoixService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getVilles()
    this.getFruitsLegumes()
    this.checkConnexion()
    this.total=0;
    this.testAchat=false;
    this.confirmed=false;
    this.validateButton=true;
    this.Article=false;
    this.enableGeoLoc=false;
    this.overlays = [];
  
    this.rechercheForm=new FormGroup({
        nom:new FormControl,
        ville:new FormControl,
        geolocalisation:new FormControl
      })

      this.achatForm=new FormGroup({
        dateAchat:new FormControl,
        quantite:new FormControl,
        particulier:new FormGroup({
          idUser:new FormControl
        }),
        article:new FormGroup({
          idArticle:new FormControl
        }),

      })

      this.infoWindow = new google.maps.InfoWindow();
  }
  showSuccess() {
    this.messageService.add({key: 'c', severity:'success', summary: 'Success Message', detail:'Order submitted'});
}
  findArticles(){
    if(this.rechercheForm.value.nom==null || this.rechercheForm.value.nom.length==0){
      this.messageService.add({severity:'error', summary: 'Produit', detail:'le champ «Produit» est requis'});
    }else if((this.rechercheForm.value.ville==null  || this.rechercheForm.value.ville.nom==null) && !this.enableGeoLoc){
      this.messageService.add({severity:'error', summary: 'Lieu', detail:'Définir un lieu de recherche'});
    }else{
      this.produitRECHERCHE=this.rechercheForm.value.nom.nom;
      this.villeRECHERCHE=this.rechercheForm.value.ville.nom;
      this.aServ.findArticles(this.rechercheForm.value.nom.nom, this.rechercheForm.value.ville.nom).subscribe((data)=>{
      this.articlesListe=data
      console.log(this.articlesListe);
      
      this.rechercheForm.reset()
      this.showResultMessage(this.articlesListe.length)
      this.afficherResCarte()
    })
    }
  }

  afficherResCarte(){
    this.afficher=false;
    this.articlesListe
    var echec = 0
    var ok = 0
    for(var i = 0; i<this.articlesListe.length;i++){
      if(!(this.articlesListe[i].producteur.latitude ==0 || this.articlesListe[i].producteur.latitude == null || this.articlesListe[i].producteur.longitude ==0 || this.articlesListe[i].producteur.longitude == null )){
        ok=1
        var lat = this.articlesListe[i].producteur.latitude
        var lng = this.articlesListe[i].producteur.longitude
        console.log("lat : "+lat);
        console.log("lng : "+lng);
        this.overlays.push(new google.maps.Marker({position:{lat: lat, lng: lng}, title:this.articlesListe[i].producteur.nom}));
        console.log(this.articlesListe[0].producteur.latitude);
        console.log(this.articlesListe[0].producteur.longitude);
        
        
        this.center={lat:this.articlesListe[0].producteur.latitude, lng:this.articlesListe[0].producteur.longitude}
          this.options = {
            center: this.center,
            zoom: 12
          };
      }else{
        echec = echec + 1
      }
    }
    console.log(ok);
  
    this.afficher=true;
   
    if(echec>0){
      this.messageService.add({severity:'warn', summary: 'Mise à jour carte', detail:echec+" résultats n'ont pas pu êtres affichés sur la carte, mais tous les résultats sont listés."});
    }
   
  }
  

  showResultMessage(nb){
    if(nb==0){
      this.messageService.add({severity:'warn', summary: 'Aucun résultat', detail:'pas de résultat pour cette recherche'});
    }else if(nb==1){
      this.messageService.add({severity:'success', summary: 'Succès', detail:this.articlesListe.length+' résustat'});
    }else{
      this.messageService.add({severity:'success', summary: 'Succès', detail:this.articlesListe.length+' résustats'});
    }
  }
  handleOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;
    if (isMarker) {
        let title = event.overlay.getTitle();
        this.infoWindow.setContent('' + title + '');
        this.infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());
        console.log("OK");
    }
    else {
       console.log("NOK");
       
    }
  }

  onReject() {
    console.log("ee");
    this.messageService.clear('c');
  }
  geolocalisation(){
      if(this.enableGeoLoc){this.enableGeoLoc=false}
      else{
        this.afficher=false; //masquer le conteneur gmap du html pour le réafficher par la suite, cela permet une prise en compte automatique des modifs lors du afficher=true
        this.enableGeoLoc=true
        if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition((data)=>{
          this.myLat=data.coords.latitude
          this.myLng=data.coords.longitude
          this.apiAdresseGouv.getAdresse(this.myLat,this.myLng).subscribe((data)=>{
            this.maVille=data
            console.log(data);
            
            this.maVille=this.maVille.features[0].properties.city
            this.rechercheForm.controls['ville'].setValue(this.maVille)
          })
          console.log("lat : "+this.myLat);
          console.log("lng : "+this.myLng);
          this.overlays.push(new google.maps.Marker({position:{lat: this.myLat, lng: this.myLng}, title:"Moi"}));
          this.center={lat:this.myLat, lng:this.myLng}
          this.options = {
            center: this.center,
            zoom: 12
          };
          this.afficher=true;
          });

      }
      
    }

    getVilles(){
      this.apiGeoGouv.getVillesList().subscribe((data)=>{
      this.dataVilles=data;     
      for(var i = 0 ; i<this.dataVilles.length;i++){
        this.NomsVilles.push(this.dataVilles[i].nom)
      }  
    })}

  search(event) {
    let query = event.query;
    var ListeVilles=this.dataVilles
    this.NomsVilles = this.filtrerVille(query, ListeVilles);
  
}

searchArt(event) {
  let query = event.query;
  var ListeArt=this.ListeArticlesEnumData
  this.ListeArticlesEnum = this.filtrerArt(query, ListeArt);

}
filtrerVille(query, ListeVilles: any[]):any[] {
  let filtered : any[] = [];
  for(let i = 0; i < ListeVilles.length; i++) {
      let ville = ListeVilles[i];
      if (ville.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(ville);
      }
  }
  return filtered;
}

filtrerArt(query, ListeArt: any[]):any[] {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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
  this.aServ.getFruitsLegumEnum().subscribe((data)=>{
    this.temp=data;
    
    for(var i=0;i<this.temp.length;i++){
      this.ListeArticlesEnumData[i]=({'nom':data[i]})
    } 
    this.ListeArticlesEnum=data;
  
  })
}

checkConnexion(){
if(localStorage.getItem('currentUser')!=null){
  this.connected=true;
}else{
  this.connected=false;
}
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
    this.aServ.findArticles(this.produitRECHERCHE, this.villeRECHERCHE).subscribe((dataArt)=>{
      this.articlesListe=dataArt
      this.messageService.add({severity:'success', summary: 'Achat effectué', detail:'votre achat a été effectuté'});
      })
  })
}
 
}
