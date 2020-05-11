import { Component, OnInit } from '@angular/core';
import {GMapModule} from 'primeng/gmap';

import { FormGroup, FormControl } from '@angular/forms';
import { google } from "google-maps";
import { ArticleService } from '../services/article.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';


@Component({
  selector: 'app-rechercheproduit',
  templateUrl: './rechercheproduit.component.html',
  styleUrls: ['./rechercheproduit.component.css']
})
export class RechercheproduitComponent implements OnInit {
  articlesListe:any;
  rechercheForm:any;
  overlays: any[];
  google : google;
  infoWindow: any;
  enableGeoLoc=false;
  myLat:any;
  myLng:any;
  map:any;
  center={lat: 47.092901, lng: 2.388634};
  options = {
    center: this.center,
    zoom: 5.8
  };
  afficher=true;
  constructor(private aServ:ArticleService, private messageService: MessageService) { }

  ngOnInit(): void {
    
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
  getByNom(){
    console.log(this.rechercheForm.value.nom);
    console.log(this.rechercheForm.value.ville);
    console.log(this.enableGeoLoc);
    if(this.rechercheForm.value.nom==null || this.rechercheForm.value.nom.length==0){
      this.messageService.add({severity:'error', summary: 'Produit', detail:'le champ «Produit» est requis'});
    }else if((this.rechercheForm.value.ville==null  || this.rechercheForm.value.ville.length==0) && !this.enableGeoLoc){
      this.messageService.add({severity:'error', summary: 'Lieu', detail:'Définir un lieu de recherche'});
    }else{
      this.aServ.findArticles(this.rechercheForm.value.nom, this.rechercheForm.value.ville).subscribe((data)=>{
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
        this.afficher=false;
        this.enableGeoLoc=true
        if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition((data)=>{
          this.myLat=data.coords.latitude
          this.myLng=data.coords.longitude
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



}
