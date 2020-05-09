import { Component, OnInit } from '@angular/core';
import {GMapModule} from 'primeng/gmap';

import { FormGroup, FormControl } from '@angular/forms';
import { google } from "google-maps";
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-rechercheproduit',
  templateUrl: './rechercheproduit.component.html',
  styleUrls: ['./rechercheproduit.component.css']
})
export class RechercheproduitComponent implements OnInit {
  articlesListe:any;
  rechercheForm:any;
  options: any;
  overlays: any[];
  google : google;
  infoWindow: any;
  enableGeoLoc=false;
  myLat:any;
  myLng:any;
  map:any;

  constructor(private aServ:ArticleService) { }

  ngOnInit(): void {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };
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

  getByNom(){
    console.log(this.rechercheForm.value);
    
     this.aServ.getArticleByNom(this.rechercheForm.value.nom).subscribe((data)=>{
       this.articlesListe=data
       this.rechercheForm.reset()
       console.log(this.articlesListe);
       
     })
  }

  handleOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
        let title = event.overlay.getTitle();
        this.infoWindow.setContent('' + title + '');
        this.infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());

       // this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
       console.log("OK");
       
    }
    else {
       console.log("NOK");
       
    }
  }

  geolocalisation(){
    if(this.enableGeoLoc){this.enableGeoLoc=false}
    else{
      this.enableGeoLoc=true
      if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition((data)=>{
        this.myLat=data.coords.latitude
        this.myLng=data.coords.longitude
        console.log(this.myLat);
        console.log(this.myLng);
        this.overlays.push(new google.maps.Marker({position:{lat: this.myLat, lng: this.myLng}, title:"Moi"}));
     //   this.options.center={lat: this.myLat, lng: this.myLng}
        this.options = {
          center: {lat: this.myLat, lng: this.myLng},
          zoom: 12
        };
           
        });
    
    }
  }


}
