import { Component, OnInit } from '@angular/core';
import { EspaceParticulierService } from '../services/espace-particulier.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-espace-particulier',
  templateUrl: './espace-particulier.component.html',
  styleUrls: ['./espace-particulier.component.css']
})
export class EspaceParticulierComponent implements OnInit {
currentUserId : any;
currentUserKey : any;
currentUser : any;
listParticuliers : any;
formPart : any;
MesFavoris : any;
  constructor(private partServ : EspaceParticulierService) { }

  ngOnInit(): void {

    this.formPart = new FormGroup({
      idUser : new FormControl(),
      nom : new FormControl(),
      prenom : new FormControl(),
      mail : new FormControl()
    })
     
    this.currentUserId = localStorage.getItem(this.currentUserKey);
    console.log(this.currentUserKey)
    // if(this.currentUserKey!=null){}
    this.particulier(this.currentUserId)
    // console.log("currentUser.nom")
    // this.Particuliers()
  }

  particulier(id : number){
    this.partServ.Particulier(id).subscribe((data) => {
      this.currentUser = data
    })
  }

  Particuliers() {
    this.partServ.Particuliers().subscribe((data) => {
      this.listParticuliers = data

    })
  }

  deconnexion() {
    localStorage.clear();
  }

}
