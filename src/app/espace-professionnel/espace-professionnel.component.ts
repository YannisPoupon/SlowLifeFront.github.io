import { Component, OnInit } from '@angular/core';
import { EspaceParticulierService } from '../services/espace-professionnel.service';

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

  constructor(private profServ: EspaceParticulierService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

//_________________Condition affichage annonces si jamais producteur______________
if (this.currentUser.privilege =="Producteur"){
  this.Boolprod=true;
}else {
  this.Boolprod=false;
}

}

//______________________________________Partie de récup en fonction du privilege___________________________________
  artisant(id : number){
    this.profServ.Artisant(id).subscribe((data) => {
      this.currentUser = data
    })
  }
  Artisants() {
    this.profServ.Artisants().subscribe((data) => {
      this.listArt = data
    })
  }
  commercant(id : number){
    this.profServ.Commercant(id).subscribe((data) => {
      this.currentUser = data
    })
  }
  Commercants() {
    this.profServ.Commercants().subscribe((data) => {
      this.listArt = data
    })
  }
  producteur(id : number){
    this.profServ.Producteur(id).subscribe((data) => {
      this.currentUser = data
    })
  }
  Producteurs() {
    this.profServ.Producteurs().subscribe((data) => {
      this.listArt = data
    })
  }
  deconnexion() {
    localStorage.clear();
  }


  

}
