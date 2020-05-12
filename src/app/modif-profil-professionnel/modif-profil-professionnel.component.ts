import { Component, OnInit } from '@angular/core';
import { ModifProfilProfessionnelService } from '../services/modif-profil-professionnel.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modif-profil-professionnel',
  templateUrl: './modif-profil-professionnel.component.html',
  styleUrls: ['./modif-profil-professionnel.component.css']
})
export class ModifProfilProfessionnelComponent implements OnInit {

currentUser: any;
formMod : any;
prod: any;
art:any;
com:any;
listProd :any;
listCom : any;
listArt : any;



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
      departement : new FormControl(),
      privilege :new FormControl(),
      producteur :new FormGroup({
        raisonSociale: new FormControl(), 
        siret: new FormControl()}),
      artisant :new FormGroup({
        raisonSociale: new FormControl(),
        siret: new FormControl() }),
      commercant :new FormGroup({
        raisonSociale: new FormControl(),
        siret: new FormControl()})
    })
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
      if (this.currentUser.privilege == "Producteur"){
        this.updateProducteur(this.prod);
      }else if (this.currentUser.privilege == "Artisant"){
        this.updateArtisant(this.art);
      }else if (this.currentUser.privilege == "Commercant"){
        this.updateCommercant(this.com);}
    }
  
    cestqui(truc : any){
      
    }

    


  ajoutArtisant(){
    this.mods.ajoutArtisant(this.formMod.value).subscribe(()=>this.getArtisant())
  }
  ajoutProducteur(){
    this.mods.ajoutProducteur(this.formMod.value).subscribe(()=>this.getProducteur())
  }
  ajoutCommercant(){
    this.mods.ajoutCommercant(this.formMod.value).subscribe(()=>this.getCommercant())
  }

  updateProducteur(coll : any){

    this.ajoutProducteur();
  }
  updateArtisant(art : any){
    this.formMod.controls['idUser'].setValue(art.idUser)
    this.formMod.controls['login'].setValue(art.login)
    this.formMod.controls['password'].setValue(art.password)
    this.formMod.controls['mail'].setValue(art.mail)
    this.formMod.controls['nom'].setValue(art.nom)
    this.formMod.controls['prenom'].setValue(art.prenom)
    this.formMod.controls['rue'].setValue(art.rue)
    this.formMod.controls['ville'].setValue(art.ville)
    this.formMod.controls['departement'].setValue(art.departement)
    this.formMod.controls['artisant'].controls['idUser'].setValue(art.artisant.idUser)
    this.ajoutArtisant();
  }
  updateCommercant(com : any){
    this.formMod.controls['idUser'].setValue(com.idUser)
    this.formMod.controls['login'].setValue(com.login)
    this.formMod.controls['password'].setValue(com.password)
    this.formMod.controls['mail'].setValue(com.mail)
    this.formMod.controls['nom'].setValue(com.nom)
    this.formMod.controls['prenom'].setValue(com.prenom)
    this.formMod.controls['rue'].setValue(com.rue)
    this.formMod.controls['ville'].setValue(com.ville)
    this.formMod.controls['departement'].setValue(com.departement)
    this.formMod.controls['commercant'].controls['idUser'].setValue(com.commercant.idUser)
    this.ajoutCommercant();
  }

  getProducteur(){
    this.mods.getProducteur().subscribe((data)=>{
      this.listProd=data;
    })
    }
    getArtisant(){
      this.mods.getArtisant().subscribe((data)=>{
        this.listArt=data;
      })
      }
      getCommercant(){
        this.mods.getCommercant().subscribe((data)=>{
          this.listCom=data;
        })
        }
    
}

