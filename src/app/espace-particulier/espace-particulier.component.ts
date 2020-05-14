import { Component, OnInit } from '@angular/core';
import { EspaceParticulierService } from '../services/espace-particulier.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-espace-particulier',
  templateUrl: './espace-particulier.component.html',
  styleUrls: ['./espace-particulier.component.css']
})
export class EspaceParticulierComponent implements OnInit {
currentUser : any;
listParticuliers : any;
formPart : any;
listeFavoris : any;
  constructor(private partServ : EspaceParticulierService) { }

  ngOnInit(): void {
    
    this.formPart = new FormGroup({
      idUser : new FormControl(),
      nom : new FormControl(),
      prenom : new FormControl(),
      mail : new FormControl()
    })
     
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser)

  }

  particulier(id : number){
    this.partServ.Particulier(id).subscribe((data) => {
      this.currentUser = data
    })
  }

  deconnexion() {
    localStorage.clear();
  }

}
