import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
connexionStatus : any ;
login : any ;
password : any ;
formConnex : any;
currentUserKey : any;
currentId : any;
  constructor( private conServ : ConnexionService, private router: Router ) { }

  ngOnInit(): void {
    this.formConnex = new FormGroup({ 
      login : new FormControl(),
      password : new FormControl()
    }) 

  }


  connexionUser (){
    console.log(this.formConnex.value)
    this.conServ.connexion(this.formConnex.value).subscribe((data : any) => {
      console.log(data)
      
      if (data!=null){
       console.log(data.idUser)
      localStorage.setItem(this.currentUserKey, data.idUser)
        if(data.privilege=="Particulier")
        this.router.navigate(['espaceParticulier']);
      }
      
    })

  
      
  }

  clearUser(){
    localStorage.clear();
  }

}
