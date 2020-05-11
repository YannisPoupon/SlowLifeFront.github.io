import { Component, OnInit } from '@angular/core';
import { ModifProfilProfessionnelService } from '../services/modif-profil-professionnel.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modif-profil-professionnel',
  templateUrl: './modif-profil-professionnel.component.html',
  styleUrls: ['./modif-profil-professionnel.component.css']
})
export class ModifProfilProfessionnelComponent implements OnInit {

formMod : any;


  constructor(private mods:ModifProfilProfessionnelService) { }

  ngOnInit(): void {
    this.formMod=new FormGroup({
      idUser : new FormControl(),
      login : new FormControl(),
      password : new FormControl(),
      mail : new FormControl(),
      nom : new FormControl(),
      prenom : new FormControl(),
      rue : new FormControl(),
      ville : new FormControl(),
      département : new FormControl(),
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
  }

  updateProducteur(coll : any){
    this.formMod.controls['idUser'].setValue(coll.idUser)
    this.formMod.controls['login'].setValue(coll.login)
    this.formMod.controls['password'].setValue(coll.password)
    this.formMod.controls['mail'].setValue(coll.mail)
    this.formMod.controls['nom'].setValue(coll.nom)
    this.formMod.controls['prenom'].setValue(coll.prenom)
    this.formMod.controls['rue'].setValue(coll.rue)
    this.formMod.controls['ville'].setValue(coll.ville)
    this.formMod.controls['département'].setValue(coll.département)
    this.formMod.controls['producteur'].controls['idUser'].setValue(coll.producteur.idUser)
  }
  updateArtisant(coll : any){
    this.formMod.controls['idUser'].setValue(coll.idUser)
    this.formMod.controls['login'].setValue(coll.login)
    this.formMod.controls['password'].setValue(coll.password)
    this.formMod.controls['mail'].setValue(coll.mail)
    this.formMod.controls['nom'].setValue(coll.nom)
    this.formMod.controls['prenom'].setValue(coll.prenom)
    this.formMod.controls['rue'].setValue(coll.rue)
    this.formMod.controls['ville'].setValue(coll.ville)
    this.formMod.controls['département'].setValue(coll.département)
    this.formMod.controls['artisant'].controls['idUser'].setValue(coll.artisant.idUser)
  }
  updateCommercant(coll : any){
    this.formMod.controls['idUser'].setValue(coll.idUser)
    this.formMod.controls['login'].setValue(coll.login)
    this.formMod.controls['password'].setValue(coll.password)
    this.formMod.controls['mail'].setValue(coll.mail)
    this.formMod.controls['nom'].setValue(coll.nom)
    this.formMod.controls['prenom'].setValue(coll.prenom)
    this.formMod.controls['rue'].setValue(coll.rue)
    this.formMod.controls['ville'].setValue(coll.ville)
    this.formMod.controls['département'].setValue(coll.département)
    this.formMod.controls['commercant'].controls['idUser'].setValue(coll.commercant.idUser)
  }
}
