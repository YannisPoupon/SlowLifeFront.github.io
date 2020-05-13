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
    if (this.currentUser.privilege == "Producteur"){

      this.formArt=new FormGroup({
        idArticle : new FormControl(),
        nom : new FormControl(),
        typearticle : new FormControl(),
        prix : new FormControl(),
        quantiteDisponible : new FormControl(),
  
        producteur : new FormGroup({
          idUser : new FormControl() })
    })
    
    }else if (this.currentUser.privilege == "Artisant"){
 
      this.formArt=new FormGroup({
        idArticle : new FormControl(),
        nom : new FormControl(),
        typearticle : new FormControl(),
        prix : new FormControl(),
        quantiteDisponible : new FormControl(),

        artisant : new FormGroup({
           idUser : new FormControl() })
    })
    }else if (this.currentUser.privilege == "Commercant"){
  
    this.formArt=new FormGroup({
      idArticle : new FormControl(),
      nom : new FormControl(),
      typearticle : new FormControl(),
      prix : new FormControl(),
      quantiteDisponible : new FormControl(),

      commercant : new FormGroup({
         idUser : new FormControl()
  })
})}
    }

    
  ajoutUser(){
    this.mods.ajoutArtisant(this.formArt.value).subscribe(()=>{
      if (this.currentUser.privilege == "Producteur"){
        this.mods.ajoutProducteur(this.user);
      }else if (this.currentUser.privilege == "Artisant"){
        this.mods.ajoutArtisant(this.user);
      }else if (this.currentUser.privilege == "Commercant"){
        this.mods.ajoutCommercant(this.user);
      }})
  }

  updateUser(art : any){
   // this.formArt.controls['idUser'].setValue(art.idUser)
    this.formArt.controls['login'].setValue(art.login)
    this.formArt.controls['password'].setValue(art.password)
    this.formArt.controls['mail'].setValue(art.mail)
    this.formArt.controls['nom'].setValue(art.nom)
    this.formArt.controls['prenom'].setValue(art.prenom)
    this.formArt.controls['rue'].setValue(art.rue)
    this.formArt.controls['ville'].setValue(art.ville)
    this.formArt.controls['departement'].setValue(art.departement)
    if (this.currentUser.privilege == "Artisant"){
    this.formArt.controls['artisant'].controls['idUser'].setValue(art.artisant.idUser)}
    else if (this.currentUser.privilege == "Producteur"){
      this.formArt.controls['producteur'].controls['idUser'].setValue(art.artisant.idUser)}
    else if (this.currentUser.privilege == "Commercant"){
      this.formArt.controls['commercant'].controls['idUser'].setValue(art.artisant.idUser)}
    }
  

  getProducteur(){
    this.mods.getProducteur().subscribe((data)=>{
      this.listUser=data;
    })
    }
    getArtisant(){
      this.mods.getArtisant().subscribe((data)=>{
        this.listUser=data;
      })
      }
      getCommercant(){
        this.mods.getCommercant().subscribe((data)=>{
          this.listUser=data;
        })
        }
    
}

