import { Component, OnInit } from '@angular/core';
import { ModifProfilProfessionnelService } from '../services/modif-profil-professionnel.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modif-profil-professionnel',
  templateUrl: './modif-profil-professionnel.component.html',
  styleUrls: ['./modif-profil-professionnel.component.css']
})
export class ModifProfilProfessionnelComponent implements OnInit {

  listUser: any;
  currentUser: any;
formArt : any;
user : any;
BooleanForm: boolean=false;



  constructor(private mods:ModifProfilProfessionnelService) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser)
    if (this.currentUser.privilege == "Producteur"){
      this.currentUser.idUSer
  
      this.formArt=new FormGroup({
        login: new FormControl(),
        password : new FormControl(),
        mail : new FormControl(),
        nom : new FormControl(),
        prenom: new FormControl(),
        numero : new FormControl(),
        rue : new FormControl(),
        ville : new FormControl(),
        departement : new FormControl(),


        producteur : new FormGroup({
          idUser : new FormControl() })
    })
    
    }else if (this.currentUser.privilege == "Artisant"){
      this.currentUser.idUSer

      this.formArt=new FormGroup({
        login: new FormControl(),
        password : new FormControl(),
        mail : new FormControl(),
        nom : new FormControl(),
        prenom: new FormControl(),
        numero : new FormControl(),
        rue : new FormControl(),
        ville : new FormControl(),
        departement : new FormControl(),

        artisant : new FormGroup({
           idUser : new FormControl() })
    })
    }else if (this.currentUser.privilege == "Commercant"){
      this.currentUser.idUser

      this.formArt=new FormGroup({
        login: new FormControl(),
        password : new FormControl(),
        mail : new FormControl(),
        nom : new FormControl(),
        prenom: new FormControl(),
        numero : new FormControl(),
        rue : new FormControl(),
        ville : new FormControl(),
        departement : new FormControl(),

      commercant : new FormGroup({
         idUser : new FormControl()
  })
})}
    }

    
  ajoutUser(){
    console.log(this.formArt.value);
    
      if (this.currentUser.privilege == "Producteur"){
     //   this.formArt.controls['producteur'].controls['idUser'].setValue(this.currentUser.idUser)
        this.mods.ajoutProducteur(this.formArt.value).subscribe(()=>console.log("OK"))
      }else if (this.currentUser.privilege == "Artisant"){
        this.mods.ajoutArtisant(this.formArt.value).subscribe()
      }else if (this.currentUser.privilege == "Commercant"){
        this.mods.ajoutCommercant(this.formArt.value).subscribe()
      }
      this.BooleanForm=false;
    }
      
  

  updateUser(currentUser : any){
  
    console.log(this.currentUser)
    //this.formArt.controls['idUser'].setValue(currentUser.idUser)
    this.formArt.controls['login'].setValue(currentUser.login)
    this.formArt.controls['password'].setValue(currentUser.password)
    this.formArt.controls['mail'].setValue(currentUser.mail)
    this.formArt.controls['nom'].setValue(currentUser.nom)
    this.formArt.controls['prenom'].setValue(currentUser.prenom)
    this.formArt.controls['rue'].setValue(currentUser.rue)
    this.formArt.controls['numero'].setValue(currentUser.numero)
    this.formArt.controls['ville'].setValue(currentUser.ville)
    this.formArt.controls['departement'].setValue(currentUser.departement)
    if (this.currentUser.privilege == "Artisant"){
    this.formArt.controls['artisant'].controls['idUser'].setValue(currentUser.idUser)}
    else if (this.currentUser.privilege == "Producteur"){
      this.formArt.controls['producteur'].controls['idUser'].setValue(currentUser.idUser)}
    else if (this.currentUser.privilege == "Commercant"){
      this.formArt.controls['commercant'].controls['idUser'].setValue(currentUser.idUser)}
      this.BooleanForm=true;
    }
  

}

