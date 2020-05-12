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
  constructor(private conServ: ConnexionService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.formConnex = new FormGroup({
      login: new FormControl(),
      password: new FormControl()
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
        console.log(this.formConnex.value.login);
        console.log(this.formConnex.value.password);

        if (data != null) {
          this.messageService.add({ severity: 'info', summary: '', detail: 'Authentification réussie' });
          console.log(data.idUser)
          localStorage.setItem('currentUser', JSON.stringify(data))
          setTimeout(() =>{
            this.router.navigate(['accueil']);
            }, 1300);
         
        } // else afficher messaeg login ou mot de pass incorrect

      })
    }



  }

}
