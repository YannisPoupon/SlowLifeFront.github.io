import { Component, OnInit } from '@angular/core';
import { EspaceParticulierService } from '../services/espace-professionnel.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-espace-professionnel',
  templateUrl: './espace-professionnel.component.html',
  styleUrls: ['./espace-professionnel.component.css']
})
export class EspaceProfessionnelComponent implements OnInit {
  currentUser : any;
  listArt : any;
  listCom : any;
  listProd : any;
Boolprod: boolean=false;
formFeedB: any;


  constructor(private profServ: EspaceParticulierService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (this.currentUser.privilege == "Producteur"){
      this.currentUser

      this.formFeedB=new FormGroup({
        idArticle : new FormControl(),
        nom : new FormControl(),
        typearticle : new FormControl(),
        prix : new FormControl(),
        quantiteDisponible : new FormControl(),
  
        producteur : new FormGroup({
          idUser : new FormControl() })
    })
    
    }else if (this.currentUser.privilege == "Artisant"){
      

      this.formFeedB=new FormGroup({
        idArticle : new FormControl(),
        nom : new FormControl(),
        typearticle : new FormControl(),
        prix : new FormControl(),
        quantiteDisponible : new FormControl(),

        artisant : new FormGroup({
           idUser : new FormControl() })
    })
    }else if (this.currentUser.privilege == "Commercant"){
     
    this.formFeedB=new FormGroup({
      idArticle : new FormControl(),
      nom : new FormControl(),
      typearticle : new FormControl(),
      prix : new FormControl(),
      quantiteDisponible : new FormControl(),

      commercant : new FormGroup({
         idUser : new FormControl()
  })
})}
    
  
//________Condition affichage annonces si jamais producteur________
if (this.currentUser.privilege =="Producteur"){
  this.Boolprod=true;
}else {
  this.Boolprod=false;
}

  }

//______________________________________Partie de récup en fonction du privilege___________________________________

  deconnexion() {
    localStorage.clear();
  }


  

}
