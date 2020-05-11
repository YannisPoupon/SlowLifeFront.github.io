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
  listAnn : any;
  listProd : any;


  constructor(private cas:CreationAnnonceService) { }

  ngOnInit(): void {
    this.formAnn = new FormGroup({
      idAnnonce : new FormControl(),
      dateDebut: new FormControl(),
      dateFin: new FormControl(),
      typeannonce: new FormControl(),
      nombrePlace: new FormControl(),
      compensation: new FormControl(),
      producteur : new FormGroup({
        idUser : new FormControl()
    })
  })
  this.getAnnonce();

  }

ajoutAnnonce(){
    this.cas.ajoutAnnonce(this.formAnn.value).subscribe(()=>this.getAnnonce())
}
getAnnonce(){
  this.cas.getAnnonce().subscribe((data)=>{
    this.listAnn=data;
})
}
deleteAnnonce(id : number){
  this.cas.deleteAnnonce(id).subscribe(()=>this.getAnnonce())
}

updateAnnonce(coll : any){
  this.formAnn.controls['idAnnonce'].setValue(coll.idAnnonce)
  this.formAnn.controls['dateDebut'].setValue(coll.dateDebut)
  this.formAnn.controls['dateFin'].setValue(coll.dateFin)
  this.formAnn.controls['typeannonce'].setValue(coll.typeannonce)
  this.formAnn.controls['nombrePlace'].setValue(coll.nombrePlace)
  this.formAnn.controls['compensation'].setValue(coll.compensation)
  this.formAnn.controls['producteur'].controls['idUser'].setValue(coll.producteur.idUser)
}
getProducteur(){
  this.cas.getProducteur().subscribe((data)=>{
    this.listProd=data;
})
}

}
