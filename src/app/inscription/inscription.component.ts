import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { InscriptionService } from '../services/inscription.service';
import { ApiGeoGouvService } from '../services/api-geo-gouv.service';
import { ApiAdresseGouvService } from '../services/api-adresse-gouv.service';
import { MessageService } from 'primeng/api';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
//import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

BooleanPart : boolean = false;
BooleanProd : boolean = false;
BooleanArt : boolean = false;
BooleanCom : boolean = false;
BoolAutres : boolean = false;
formUser : any;
dataVilles:any;
NomsVilles:string[]=[];
MaVille:any;
MyLat:any;
MyLng:any;
Conditions=false;

  constructor(private is:InscriptionService, 
    private apiGeoGouv:ApiGeoGouvService,
    private apiAdresseGouv:ApiAdresseGouvService,
    private messageService: MessageService,
    private connexionServ : ConnexionService,
    private router: Router) { }

  ngOnInit(): void {
    this.getVilles()
    this.formUser=new FormGroup({
      privilege: new FormControl(),
      // idUser : new FormControl(),
      prenom: new FormControl(),
      nom: new FormControl(),
      login: new FormControl(),
      mail: new FormControl(),
      password: new FormControl(),
      numero: new FormControl(),
      rue: new FormControl(),
      ville: new FormControl(),
      departement: new FormControl(),
      longitude: new FormControl(),
      latitude: new FormControl(),
      raisonSociale:new FormControl(),
      siret:new FormControl()
  })

  }
//________________________________________________FONCTIONS DU FORM_______________________________________________________

/*Fonction d'inscription */
inscription(){
  this.checkAndSave()
}

/*Verification form + sauvegarde dans bdd*/
checkAndSave(){
  if(this.formUser.value.prenom==null || this.formUser.value.prenom.length==0){
    this.messageService.add({severity:'error', summary: 'Prénom', detail:'le champ «Prénom» est requis'});
  }else  if(this.formUser.value.nom==null || this.formUser.value.nom.length==0){
    this.messageService.add({severity:'error', summary: 'Nom', detail:'le champ «Nom» est requis'});
  }else  if(this.formUser.value.login==null || this.formUser.value.login.length==0){
    this.messageService.add({severity:'error', summary: 'Login', detail:'le champ «Login» est requis'});
  }else  if(this.formUser.value.mail==null || this.formUser.value.mail.length==0){
    this.messageService.add({severity:'error', summary: 'Email', detail:'le champ «Email» est requis'});
  }else  if(this.formUser.value.password==null || this.formUser.value.password.length==0){
    this.messageService.add({severity:'error', summary: 'Password', detail:'le champ «Password» est requis'});
  }else  if(this.formUser.value.numero==null || this.formUser.value.numero.length==0){
    this.messageService.add({severity:'error', summary: 'N° de voie', detail:'le champ «N°» est requis'});
  }else  if(this.formUser.value.rue==null || this.formUser.value.rue.length==0){
    this.messageService.add({severity:'error', summary: 'Rue', detail:'le champ «Rue» est requis'});
  }else  if(this.formUser.value.ville==null || this.formUser.value.ville.nom==null){
    this.messageService.add({severity:'error', summary: 'Ville', detail:'le champ «Ville» est requis'});
  }else if(this.formUser.value.departement==null || this.formUser.value.departement.length==0){
    this.messageService.add({severity:'error', summary: 'Département', detail:'le champ «Département» est requis'});
  }else if(this.formUser.value.privilege==null || this.formUser.value.privilege.length==0){
    this.messageService.add({severity:'error', summary: 'Status', detail:'le champ «Status» est requis'});
  }else if(this.BoolAutres==true && (this.formUser.value.raisonSociale==null || this.formUser.value.raisonSociale.length==0)){
    this.messageService.add({severity:'error', summary: 'Raison Sociale', detail:'le champ «Raison Sociale» est requis'});
  }else if(this.BoolAutres==true && (this.formUser.value.siret==null || this.formUser.value.siret.length==0)){
    this.messageService.add({severity:'error', summary: 'Siret', detail:'le champ «Siret» est requis'});
  }else if(!this.Conditions){
    this.messageService.add({severity:'error', summary: "Conditions d'utilisation", detail:"Vous devez accepter les conditions d'utilisation"});
  }
  else{
    console.log("****************");
    console.log("fonction checkAndSave ok");
    console.log("go to getCoords");
    console.log("****************");
    this.getCoords()
  }
}

/*Fonction d'obtention des coordonnées Lat et Lng en fonction de l'adresse saisie dans le Form*/
getCoords(){
 var rueFormat=this.formUser.value.rue.split(' ').join('+')
 var adresse=this.formUser.value.numero+'+'+rueFormat
 var postcode = this.formUser.value.departement
 this.apiAdresseGouv.getCoords(adresse,postcode).subscribe((data)=>{
   var resData: any =data;
   this.MyLng = resData.features[0].geometry.coordinates[0];
   this.MyLat = resData.features[0].geometry.coordinates[1];
   this.formUser.controls['longitude'].setValue(this.MyLng)
   this.formUser.controls['latitude'].setValue(this.MyLat)
   console.log("****************");
   console.log("fonction getCoords ok");
   console.log("latitude : "+this.MyLat);
   console.log("longitude : "+this.MyLng);
   console.log("go to saveSave");
   console.log("****************");
   this.save()

 })
}

/*Sauvegarde dans la bdd*/
 save() {
  this.formUser.controls['ville'].setValue(this.formUser.value.ville.nom)
  console.log("****************");
  console.log("fonction save");
  console.log("valeur finale du formulaire");
  console.log(this.formUser.value)
  console.log("****************");
  
  var test = this.formUser.value.privilege
  if (test == 1){
    console.log("producteur");
    this.is.ajoutProducteur(this.formUser.value).subscribe(()=>{
      this.redirection()
      console.log("Producteur ajouté")})}
  else if (test == 2){
    console.log("Artisant");
    this.is.ajoutArtisant(this.formUser.value).subscribe(()=>{
      this.redirection()
      console.log("Artisant ajouté")})
  }
  else if (test == 3){
    console.log("Particulier");
    this.is.ajoutParticulier(this.formUser.value).subscribe(()=>{
      this.redirection()
      console.log("Particulier ajouté!")})
  }
  else if (test == 4){
    console.log("Commercant");
    this.is.ajoutCommercant(this.formUser.value).subscribe(()=>{
      this.redirection()
      console.log("Commerçant ajputé")})
  }
  else(console.log("ERREUR"))
 }

  /*Fonction pour afficher le reste des inputs en fonction du privilège*/
 choisis(event : any){
  var test = this.formUser.value.privilege
  if (test == 1 || test== 2 || test== 4){
  this.BoolAutres=true
 }else{this.BoolAutres=false}
 }
/*Fonction pour enregistrer la liste des numéro de départements*/
getVilles(){
  this.apiGeoGouv.getVillesList().subscribe((data)=>{
  this.dataVilles=data; 
  for(var i = 0 ; i<this.dataVilles.length;i++){
    this.NomsVilles.push(this.dataVilles[i].nom)
  } 
})
}

/*Fonction appelée pour mettre à jour la liste en fonction de la saisie*/
search(event) {
  let query = event.query;
  this.NomsVilles = this.filtrerVille(query, this.dataVilles);
}

/*Filtrage de la liste en fonction de la saisie*/
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

/*Fonction de remplissage automatique du département lors du choix d'une ville de la lise*/
selected(event:any){
  var code;
  if(event.codesPostaux.length==null){
    code=event.code
  }else{
    code=event.codesPostaux[0]
  }
  this.formUser.controls['departement'].setValue(code)  
}

/*check conditions d'utilisations*/
checkConditions(){
  if(this.Conditions){this.Conditions=false}
  else{this.Conditions=true}
}
/*Afficher Success en cas de création de compte ok*/
redirection(){
  this.connexionServ.connexion(this.formUser.value).subscribe((data:any)=>{
    if (data != null) {
      this.messageService.add({severity:'success', summary: 'Success', detail:'Votre compte a bien été crée, patientez quelques secondes'});
      console.log(data.idUser)
      localStorage.setItem('currentUser', JSON.stringify(data))
      setTimeout(() =>{
        this.router.navigate(['accueil']);
        }, 5000);
     
    } 
  })
}
}

