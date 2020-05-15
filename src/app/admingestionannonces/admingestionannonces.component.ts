import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreationAnnonceService } from '../services/creation-annonce.service';

@Component({
  selector: 'app-admingestionannonces',
  templateUrl: './admingestionannonces.component.html',
  styleUrls: ['./admingestionannonces.component.css']
})
export class AdmingestionannoncesComponent implements OnInit {
formAnn:any;
listeAnnonces:any
  constructor(private cas:CreationAnnonceService) { }

  ngOnInit(): void {
    this.getAllAnnonces()
    this.formAnn=new FormGroup({
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
getAllAnnonces(){
  this.cas.getAnnonce().subscribe((data)=>{
    this.listeAnnonces=data
  console.log(this.listeAnnonces);
  })
}

delete(id){
  this.cas.deleteAnnonce(id).subscribe(()=>this.getAllAnnonces())
}

afficherFormModif(ann:any){
    this.formAnn.controls['idAnnonce'].setValue(ann.idAnnonce)
    this.formAnn.controls['dateDebut'].setValue(ann.dateDebut)
    this.formAnn.controls['dateFin'].setValue(ann.dateFin)
    this.formAnn.controls['typeannonce'].setValue(ann.typeannonce)
    this.formAnn.controls['nombrePlace'].setValue(ann.nombrePlace)
    this.formAnn.controls['compensation'].setValue(ann.compensation)
    this.formAnn.controls['producteur'].controls['idUser'].setValue(ann.producteur.idUser)
}

Modifier(){
  this.cas.ajoutAnnonce(this.formAnn.value).subscribe(()=>this.getAllAnnonces())
}
}
