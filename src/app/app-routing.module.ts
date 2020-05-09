import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionComponent } from './inscription/inscription.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { RechercheproduitComponent } from './rechercheproduit/rechercheproduit.component';


const routes: Routes = [
  {path : 'inscription', component : InscriptionComponent},
  {path : 'navbar', component : NavBarComponent},
  { path: 'acceuil', component:AcceuilComponent },
  { path: 'rechercheproduit', component:RechercheproduitComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
