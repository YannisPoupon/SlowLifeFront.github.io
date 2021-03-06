import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { RechercheproduitComponent } from './rechercheproduit/rechercheproduit.component';
import {GMapModule} from 'primeng/gmap';
import { InscriptionComponent } from './inscription/inscription.component';
import { EspaceParticulierComponent } from './espace-particulier/espace-particulier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnexionComponent } from './connexion/connexion.component';
import { AnnonceJobComponent } from './annonce-job/annonce-job.component';
import { EspaceProfessionnelComponent } from './espace-professionnel/espace-professionnel.component';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { ModifProfilProfessionnelComponent } from './modif-profil-professionnel/modif-profil-professionnel.component';
import { CreationAnnonceComponent } from './creation-annonce/creation-annonce.component';
import { CreationArticleComponent } from './creation-article/creation-article.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DatePipe } from '@angular/common';
import {CalendarModule} from 'primeng/calendar';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdmingestionusersComponent } from './admingestionusers/admingestionusers.component';
import { AdmingestionannoncesComponent } from './admingestionannonces/admingestionannonces.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InscriptionComponent,
    EspaceParticulierComponent,
    AcceuilComponent,
    RechercheproduitComponent,
    ConnexionComponent,
    AnnonceJobComponent,
    EspaceProfessionnelComponent,
    ModifProfilProfessionnelComponent,
    CreationAnnonceComponent,
    CreationArticleComponent,
    AdminhomeComponent,
    AdmingestionusersComponent,
    AdmingestionannoncesComponent
    

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GMapModule,
    FormsModule,
    ToastModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    CalendarModule

  ],
  providers: [
    MessageService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
