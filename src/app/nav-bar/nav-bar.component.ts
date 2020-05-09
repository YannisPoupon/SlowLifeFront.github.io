import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
//deconnecte=true;connecte=false;

deconnecte=false;connecte=true;
  constructor() { }

  ngOnInit(): void {
  }

}
