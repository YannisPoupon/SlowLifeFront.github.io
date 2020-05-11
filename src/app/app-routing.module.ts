import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionComponent } from './inscription/inscription.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { RechercheproduitComponent } from './rechercheproduit/rechercheproduit.component';
import { EspaceParticulierComponent } from './espace-particulier/espace-particulier.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EspaceProfessionnelComponent } from './espace-professionnel/espace-professionnel.component';
import { ModifProfilProfessionnelComponent } from './modif-profil-professionnel/modif-profil-professionnel.component';
import { CreationArticleComponent } from './creation-article/creation-article.component';
import { CreationAnnonceComponent } from './creation-annonce/creation-annonce.component';


const routes: Routes = [
  {path : 'inscription', component : InscriptionComponent},
  {path : 'navbar', component : NavBarComponent},
  { path: 'accueil', component:AcceuilComponent },
  { path: 'rechercheproduit', component:RechercheproduitComponent },
  { path: 'espaceparticulier', component:EspaceParticulierComponent },
  { path: 'connexion', component:ConnexionComponent },
  { path: 'espaceprofessionnel', component:EspaceProfessionnelComponent },
  { path: '', component:AcceuilComponent },
  { path: 'modificationprofilpro', component:ModifProfilProfessionnelComponent },
  { path: 'creationarticle', component:CreationArticleComponent },
  { path: 'creationannonce', component:CreationAnnonceComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
