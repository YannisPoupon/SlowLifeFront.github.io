import { Component, OnInit } from '@angular/core';
import {GMapModule} from 'primeng/gmap';

import { FormGroup, FormControl } from '@angular/forms';
import { google } from "google-maps";
import { ArticleService } from '../services/article.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { ApiGeoGouvService } from '../services/api-geo-gouv.service';
import { ApiAdresseGouvService } from '../services/api-adresse-gouv.service';


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
  NomsVilles:string[]=[]
  center={lat: 47.092901, lng: 2.388634};
  options = {
    center: this.center,
    zoom: 5.8
  };
  afficher=true;
  constructor(private aServ:ArticleService, 
    private messageService: MessageService, 
    private apiGeoGouv:ApiGeoGouvService,
    private apiAdresseGouv:ApiAdresseGouvService) { }

  ngOnInit(): void {
    this.getVilles()
    this.getFruitsLegumes()
    this.enableGeoLoc=false;
    this.overlays = [
      // new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
      // new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
      // new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"})
    
    ];
  
    this.rechercheForm=new FormGroup({
        nom:new FormControl,
        ville:new FormControl,
        geolocalisation:new FormControl
      })

      this.infoWindow = new google.maps.InfoWindow();
  }
  showSuccess() {
    console.log("oo");
    
    this.messageService.add({key: 'c', severity:'success', summary: 'Success Message', detail:'Order submitted'});
}
  findArticles(){
    if(this.rechercheForm.value.nom==null || this.rechercheForm.value.nom.length==0){
      this.messageService.add({severity:'error', summary: 'Produit', detail:'le champ «Produit» est requis'});
    }else if((this.rechercheForm.value.ville==null  || this.rechercheForm.value.ville.nom==null) && !this.enableGeoLoc){
      this.messageService.add({severity:'error', summary: 'Lieu', detail:'Définir un lieu de recherche'});
    }else{
      this.aServ.findArticles(this.rechercheForm.value.nom.nom, this.rechercheForm.value.ville.nom).subscribe((data)=>{
      this.articlesListe=data
      this.rechercheForm.reset()
      this.showResultMessage(this.articlesListe.length)
    })
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
          console.log(this.myLat);
          console.log(this.myLng);
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
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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
 
}
