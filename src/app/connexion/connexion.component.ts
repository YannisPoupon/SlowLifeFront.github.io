import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


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
currentId : any;
privilege :any;
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
      localStorage.setItem('currentUser', JSON.stringify(data))
       // if(data.privilege=="Particulier")
        this.router.navigate(['accueil']);
      }
      
    })

  
      
  }

  clearUser(){
    localStorage.clear();
  }

}
