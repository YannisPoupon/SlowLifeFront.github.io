import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { InscriptionService } from '../services/inscription.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admingestionusers',
  templateUrl: './admingestionusers.component.html',
  styleUrls: ['./admingestionusers.component.css']
})
export class AdmingestionusersComponent implements OnInit {
listeUsers:any;
formUser:any;
  constructor(private us:UsersService, private is:InscriptionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAll()
    this.formUser=new FormGroup({
      idUser:new FormControl(),
      login: new FormControl(),
      password : new FormControl(),
      mail : new FormControl(),
      nom : new FormControl(),
      prenom: new FormControl(),
      numero : new FormControl(),
      rue : new FormControl(),
      ville : new FormControl(),
      departement : new FormControl(),
      longitude : new FormControl(),
      latitude : new FormControl(),
      privilege : new FormControl()
    })
  }
  
  deleteUser(id : any){
    this.us.deleteById(id).subscribe(()=>this.getAll())  
    console.log(this.listeUsers)
  }
  
  getAll(){
    this.us.getAllUsers().subscribe((data)=>{
      this.listeUsers=data
      console.log(this.listeUsers)
    })  
  }

  afficherFormModif(user:any){
    this.formUser.controls['latitude'].setValue(user.latitude)
    this.formUser.controls['longitude'].setValue(user.longitude)
    this.formUser.controls['idUser'].setValue(user.idUser)
    this.formUser.controls['login'].setValue(user.login)
    this.formUser.controls['password'].setValue(user.password)
    this.formUser.controls['mail'].setValue(user.mail)
    this.formUser.controls['nom'].setValue(user.nom)
    this.formUser.controls['prenom'].setValue(user.prenom)
    this.formUser.controls['numero'].setValue(user.numero)
    this.formUser.controls['rue'].setValue(user.rue)
    this.formUser.controls['ville'].setValue(user.ville)
    this.formUser.controls['departement'].setValue(user.departement) 
    this.formUser.controls['privilege'].setValue(user.privilege) 
  }

  ModifierUser(){
    console.log(this.formUser.value);
    
    if(this.formUser.value.privilege=="Producteur"){
      this.is.ajoutProducteur(this.formUser.value).subscribe(()=>{
        this.getAll()
        this.messageService.add({ severity: 'success', summary: ' Modifié', detail: 'modification effectuée!' });
      })
    }

    if(this.formUser.value.privilege=="Artisant"){
      this.is.ajoutArtisant(this.formUser.value).subscribe(()=>{
        this.getAll()
        this.messageService.add({ severity: 'success', summary: ' Modifié', detail: 'modification effectuée!' });
      })
    }

    if(this.formUser.value.privilege=="Commercant"){
      this.is.ajoutCommercant(this.formUser.value).subscribe(()=>{
        this.getAll()
        this.messageService.add({ severity: 'success', summary: ' Modifié', detail: 'modification effectuée!' });
      })
    }

    if(this.formUser.value.privilege=="Particulier"){
      this.is.ajoutParticulier(this.formUser.value).subscribe(()=>{
        this.getAll()
        this.messageService.add({ severity: 'success', summary: ' Modifié', detail: 'modification effectuée!' });
      })
    }

    if(this.formUser.value.privilege=="Admin"){
      this.is.ajoutAdmin(this.formUser.value).subscribe(()=>{
        this.getAll()
        this.messageService.add({ severity: 'success', summary: ' Modifié', detail: 'modification effectuée!' });
      })
    }
   // this.us.updateUser(this.formUser.value).subscribe(()=>this.getAll())
  }

}
