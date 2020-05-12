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
BooleanProf:any;

  formOther : any;
  formUser : any;
  listPart: any;
  listCom : any;
  listProd : any;
  listArt : any;


  constructor(private is:InscriptionService) { }

  ngOnInit(): void {
    this.formUser=new FormGroup({
      privilege: new FormControl(),
       idUser : new FormControl(),
      prenom: new FormControl(),
      nom: new FormControl(),
      login: new FormControl(),
      mail: new FormControl(),
      password: new FormControl(),
      rue: new FormControl(),
      ville: new FormControl(),
      departement: new FormControl(),
    producteur :new FormGroup({
      raisonSociale: new FormControl(),
    siret: new FormControl(),
    artisant :new FormGroup({
      raisonSociale: new FormControl(),
    siret: new FormControl(),
    commercant :new FormGroup({
      raisonSociale: new FormControl(),
    siret: new FormControl(),
  })
  })
    })
  })
   this.formOther = new FormGroup({
    privilege: new FormControl(),
    idUser : new FormControl(),
    prenom: new FormControl(),
    nom: new FormControl(),
    login: new FormControl(),
    mail: new FormControl(),
    password: new FormControl(),
    rue: new FormControl(),
    ville: new FormControl(),
    departement: new FormControl(),
    raisonSociale: new FormControl(),
    siret: new FormControl()
   })

  
  }

  ajoutCommercant(){
    this.is.ajoutCommercant(this.formUser.value).subscribe(()=>this.getCommercant())
  }
  ajoutProducteur(){
    this.is.ajoutProducteur(this.formUser.value).subscribe(()=>this.getProducteur())
  }
  ajoutParticulier(){
    this.is.ajoutParticulier(this.formUser.value).subscribe(()=>this.getParticulier())
  }
  ajoutArtisant(){
    this.is.ajoutParticulier(this.formUser.value).subscribe(()=>this.getArtisant())
  }
  getParticulier(){
    this.is.getParticulier().subscribe((data)=>{
      this.listPart=data;
  })
}
getCommercant(){
  this.is.getCommercant().subscribe((data)=>{
    this.listCom=data;
})
}  getArtisant(){
  this.is.getArtisant().subscribe((data)=>{
    this.listArt=data;
})
}
 getProducteur(){
  this.is.getProducteur().subscribe((data)=>{
    this.listProd=data;
})
}
//________________________________________________FONCTIONS DU FORM_______________________________________________________



 inscription() {
  console.log(this.formUser.value.privilege)
  if (this.formUser.value.privilege == 3) { 
    this.BoolAutres  = false;
    
  }else {
    this.BoolAutres = true;   
    }
   }

 choisis(event : any){
   this.inscription()
   console.log(this.formUser.value.privilege)
  if (this.formUser.value.privilege == 1){
  this.BooleanProd = true;
 }else if (this.formUser.value.privilege == 2){
   this.BooleanArt = true;
 }else if (this.formUser.value.privilege == 3){
  this.BooleanPart = true;
}else if (this.formUser.value.privilege == 4){
  this.BooleanCom =true;
 }
 }
 
onvalide(){
  console.log(this.formUser.value.privilege)
if (this.BooleanProd =true){
  document.forms["formUser"].submit();
  document.forms["formOther"].submit();
  this.ajoutProducteur()
}else if(this.BooleanArt=true){
  document.forms["formUser"].submit();
  document.forms["formOther"].submit();
  this.ajoutArtisant();
}else if (this.BooleanPart=true){
  document.forms["formUser"].submit();
  this.ajoutParticulier();
}else if (this.BooleanCom=true){
  document.forms["formUser"].submit();
  document.forms["formOther"].submit();
  this.ajoutCommercant();
}


}

}

