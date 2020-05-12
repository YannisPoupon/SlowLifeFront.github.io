import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { InscriptionService } from '../services/inscription.service';
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


  formOther : any;
  formUser : any;
  listPart: any;
  listCom : any;
  listProd : any;
  listArt : any;
  NEPASUTILISER : any;

  constructor(private is:InscriptionService) { }

  ngOnInit(): void {
    this.formUser=new FormGroup({
      privilege: new FormControl(),
      // idUser : new FormControl(),
      prenom: new FormControl(),
      nom: new FormControl(),
      login: new FormControl(),
      mail: new FormControl(),
      password: new FormControl(),
      rue: new FormControl(),
      ville: new FormControl(),
      département: new FormControl(),
      raisonSociale:new FormControl(),
      siret:new FormControl()
    
  })

  }
//________________________________________________FONCTIONS DU FORM_______________________________________________________


/*Fonction d'inscription */
 inscription() {
  console.log(this.formUser.value)

  var test = this.formUser.value.privilege
  if (test == 1){
    console.log("producteur");
    this.is.ajoutProducteur(this.formUser.value).subscribe(()=>console.log("Producteur ajouté"))}
  else if (test == 2){
    console.log("Artisant");
    this.is.ajoutArtisant(this.formUser.value).subscribe(()=>console.log("Artisant ajouté"))
  }
  else if (test == 3){
    console.log("Particulier");
    this.is.ajoutParticulier(this.formUser.value).subscribe(()=>console.log("Particulier ajouté!"))
  }
  else if (test == 4){
    console.log("Commercant");
    this.is.ajoutCommercant(this.formUser.value).subscribe(()=>console.log("Commerçant ajputé"))
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

}

