import { Component, OnInit } from '@angular/core';
import { EspaceParticulierService } from '../services/espace-professionnel.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';

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
formFeedB: any;
listFeed : any;


  constructor(private profServ: EspaceParticulierService, private feeds:FeedbackService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (this.currentUser.privilege == "Producteur"){
    
      this.formFeedB=new FormGroup({
        note : new FormControl(),
        commentaire : new FormControl(),
        userDonne : new FormGroup({
          idUser : new FormControl()
        }),
        userRecoit : new FormGroup({
          idUser : new FormControl()
        })
      }) 
        
    
    }else if (this.currentUser.privilege == "Artisant"){
      

      this.formFeedB=new FormGroup({
        note : new FormControl(),
        commentaire : new FormControl(),
        userDonne : new FormGroup({
          idUser : new FormControl()
        }),
        userRecoit : new FormGroup({
          idUser : new FormControl()
        })
      }) 
    }else if (this.currentUser.privilege == "Commercant"){
     
    this.formFeedB=new FormGroup({
      note : new FormControl(),
      commentaire : new FormControl(),
      userDonne : new FormGroup({
        idUser : new FormControl()
      }),
      userRecoit : new FormGroup({
        idUser : new FormControl()
      })
    }) 
}
console.log(this.currentUser);
this.getFeedback()
  
//________Condition affichage annonces si jamais producteur________
if (this.currentUser.privilege =="Producteur"){
  this.Boolprod=true;
}else {
  this.Boolprod=false;
}
  }


  deconnexion() {
    localStorage.clear();
  }
 
//________________list feedbacks______________

getFeedback(){

this.feeds.getAllFeedback().subscribe((data)=>{
  this.listFeed=data;
  console.log(this.listFeed);
 
})//ngIf si idUser_Recoit == à celle de currentUser.IdUSer
}

}













