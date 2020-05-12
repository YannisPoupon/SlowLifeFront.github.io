import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
//deconnecte=true;connecte=false;
currentUser : any;
userID: any;
connecte = false;
formConnex : any;
privilege :any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.formConnex = new FormGroup({ 
    })
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.connexionCheck()
    if (this.currentUser!=null){
    console.log(this.currentUser)
    console.log(this.currentUser.nom)}
  }

  connexionCheck() {
    
    if (this.currentUser!= null) {
      this.connecte=true
    } else {this.connecte=false
      
    }
  }

  clearUser(){
    
    localStorage.clear();
    console.log(localStorage.getItem(this.currentUser))
    this.router.navigate(['']);
  }

}
