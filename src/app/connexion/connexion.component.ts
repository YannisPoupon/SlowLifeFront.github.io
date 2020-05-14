import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  connexionStatus: any;
  login: any;
  password: any;
  formConnex: any;
  currentId: any;
  privilege: any;
  formRecup : any;
  recup : any;
  constructor(private conServ: ConnexionService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.formConnex = new FormGroup({
      login: new FormControl(),
      password: new FormControl()
    })

    this.formRecup = new FormGroup({
      mail : new FormControl(),
    })


  }


  connexionUser() {
    console.log(this.formConnex.value)
    if (this.formConnex.value.login == null || this.formConnex.value.login.length == 0) {
      this.messageService.add({ severity: 'warn', summary: 'Login', detail: 'Veuilliez renseigner votre login' });
    }
    else if (this.formConnex.value.password == null || this.formConnex.value.password.length == 0) {
      this.messageService.add({ severity: 'warn', summary: 'Login', detail: 'Veuillez renseigner votre mot de passe' });
    }
    else {
      this.conServ.connexion(this.formConnex.value).subscribe((data: any) => {
        console.log(data)
         if (data==null) {
          this.messageService.add({ severity: 'error', summary: 'Attention !', detail: 'Login ou mot de pass erronés' });
         }
        else if (data != null) {

            if(data.privilege=="Admin"){
              console.log("ok");
              this.messageService.add({ severity: 'info', summary: '', detail: 'Authentification réussie' });
              localStorage.setItem('currentUser', JSON.stringify(data))
              setTimeout(() =>{
                this.router.navigate(['adminHome']);
                }, 1300);
              
            }else{
              this.messageService.add({ severity: 'info', summary: '', detail: 'Authentification réussie' });
              localStorage.setItem('currentUser', JSON.stringify(data))
              setTimeout(() =>{
                this.router.navigate(['accueil']);
                }, 1300);
            }
        } 

      })
    }

  

  }

  recupUser (){
    this.conServ.recupUser(this.formRecup.value).subscribe((data)=> {
      console.log(data)
      this.formRecup.reset()
      if (data==true) {
        this.recup=true
        setTimeout(() =>{
          location.reload()
          }, 1600);
        // this.messageService.add({ severity: 'info', summary: 'Récupération', detail: 'Un email contenant vos identifiants vous a été envoyé' });
      } else 
      // this.messageService.add({ severity: 'warn', summary: 'Attention !', detail: 'email inconnu' });
        this.recup=false
    })
  }

}
