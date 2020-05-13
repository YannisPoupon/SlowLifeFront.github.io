import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreationAnnonceService } from '../services/creation-annonce.service';

@Component({
  selector: 'app-creation-annonce',
  templateUrl: './creation-annonce.component.html',
  styleUrls: ['./creation-annonce.component.css']
})
export class CreationAnnonceComponent implements OnInit {

  formAnn: any;
  listProd : any;
  formNew:any;
formArt : any;
listArt : any;
BooleanForm : boolean =false;
currentUser: any;
contenantart: any;


  constructor(private cas:CreationAnnonceService) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      this.getAnnonceByProd();
      this.formArt=new FormGroup({
        idAnnonce : new FormControl(),
        dateDebut : new FormControl(),
        dateFin : new FormControl(),
        typeannonce : new FormControl(),
        nombrePlace : new FormControl(),
        compensation : new FormControl(),

        producteur : new FormGroup({
          idUser : new FormControl() })
    })
    

}

updateAnnonce(coll :any){
 this.BooleanForm=true;
this.formArt.controls['idAnnonce'].setValue(coll.idAnnonce)
this.formArt.controls['dateDebut'].setValue(coll.dateDebut)
this.formArt.controls['dateFin'].setValue(coll.dateFin)
this.formArt.controls['typeannonce'].setValue(coll.typeannonce)
this.formArt.controls['nombrePlace'].setValue(coll.nombrePlace)
this.formArt.controls['compensation'].setValue(coll.compensation)
this.formArt.controls['producteur'].controls['idUser'].setValue(coll.producteur.idUser)
}

ajoutAnnonce(){
  console.log(this.formArt.value)
  this.cas.ajoutAnnonce(this.formArt.value).subscribe(()=>this.getAnnonceByProd());
  this.BooleanForm=false;
  alert("Vos modifications ont bien été prises en compte");
}

nouvelAnnonce(){
  console.log(this.formArt.value)
  this.formArt.controls['producteur'].controls['idUser'].setValue(this.currentUser.idUser)
  this.cas.ajoutAnnonce(this.formArt.value).subscribe(()=>this.getAnnonceByProd());
}

getAnnonceByProd(){
  this.cas.getAnnonceByProd(this.currentUser).subscribe((data)=>{
    this.listArt=data;
  })
}



deleteAnnonce(id : number){
this.cas.deleteAnnonce(id).subscribe(()=>this.getAnnonceByProd());

}



}