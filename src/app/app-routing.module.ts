import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { RechercheproduitComponent } from './rechercheproduit/rechercheproduit.component';


const routes: Routes = [
  { path: 'acceuil', component:AcceuilComponent },
  { path: 'rechercheproduit', component:RechercheproduitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
