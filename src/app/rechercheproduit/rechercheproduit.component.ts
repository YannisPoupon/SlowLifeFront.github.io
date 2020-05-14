import { Component, OnInit } from '@angular/core';
import { GMapModule } from 'primeng/gmap';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { google } from "google-maps";
import { ArticleService } from '../services/article.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ApiGeoGouvService } from '../services/api-geo-gouv.service';
import { ApiAdresseGouvService } from '../services/api-adresse-gouv.service';
import { ChoixService } from '../services/choix.service';
import { DatePipe } from '@angular/common';
import { CreationArticleService } from '../services/creation-article.service';
import { InscriptionService } from '../services/inscription.service';
import { ConnexionService } from '../services/connexion.service';


@Component({
  selector: 'app-rechercheproduit',
  templateUrl: './rechercheproduit.component.html',
  styleUrls: ['./rechercheproduit.component.css']
})
export class RechercheproduitComponent implements OnInit {
  articlesListe: any; //Utilisé pour les résultats de la recherche=>Liste d'objets "Article"
  ListeArticlesEnum: any; //Utilisé pour l'input de recherche => Liste de String fruits, legumes
  ListeArticlesEnumData: any[] = [];
  temp: any;
  maVille: any;
  rechercheForm: any;
  overlays: any[];
  google: google;
  infoWindow: any;
  enableGeoLoc = false;
  myLat: any;
  myLng: any;
  map: any;
  dataVilles: any;
  NomsVilles: string[] = [];
  center: any;
  options: any;
  latInit = 47.092901
  lngInit = 2.388634
  zoom = 5.8
  afficher = true;
  connected: any;
  Article: any;
  nom: any;
  testAchat: any;
  confirmed: any;
  total: any;
  validateButton: any;
  achatForm: any;
  nombre: any;
  produitRECHERCHE;
  villeRECHERCHE;
  newFav: any;
  favItems: any;
  newItem: any;
  currentUser: any;

  constructor(private aServ: ArticleService,
    private messageService: MessageService,
    private apiGeoGouv: ApiGeoGouvService,
    private apiAdresseGouv: ApiAdresseGouvService,
    private choixService: ChoixService,
    public datepipe: DatePipe,
    private arts: CreationArticleService,
    private is: InscriptionService,
    private conServ: ConnexionService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.getVilles()
    this.getFruitsLegumes()
    this.checkConnexion()
    this.total = 0;
    this.testAchat = false;
    this.confirmed = false;
    this.validateButton = true;
    this.Article = false;
    this.enableGeoLoc = false;
    this.overlays = [];
    this.newItem = [];

    this.newFav = new FormGroup({
      idUser: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
      mail: new FormControl(),
      nom: new FormControl(),
      prenom: new FormControl(),
      numero: new FormControl(),
      rue: new FormControl(),
      ville: new FormControl(),
      departement: new FormControl(),
      longitude: new FormControl(),
      latitude: new FormControl(),
      feedbacksD: new FormControl(),
      feedbacksR: new FormControl(),
      privilege: new FormControl(),
      articles: new FormControl()
    })


    this.center = { lat: this.latInit, lng: this.lngInit };
    this.options = {
      center: this.center,
      zoom: this.zoom
    };


    this.rechercheForm = new FormGroup({
      nom: new FormControl,
      ville: new FormControl,
      geolocalisation: new FormControl
    })

    this.achatForm = new FormGroup({
      dateAchat: new FormControl,
      quantite: new FormControl,
      particulier: new FormGroup({
        idUser: new FormControl
      }),

      article: new FormGroup({
        idArticle: new FormControl
      })

    })

    this.infoWindow = new google.maps.InfoWindow();
  }

  ajouterFavori(fav: any) {
    console.log(this.currentUser)
    this.newFav.controls['idUser'].setValue(this.currentUser.idUser)
    this.newFav.controls['login'].setValue(this.currentUser.login)
    this.newFav.controls['password'].setValue(this.currentUser.password)
    this.newFav.controls['mail'].setValue(this.currentUser.mail)
    this.newFav.controls['nom'].setValue(this.currentUser.nom)
    this.newFav.controls['prenom'].setValue(this.currentUser.prenom)
    this.newFav.controls['numero'].setValue(this.currentUser.numero)
    this.newFav.controls['rue'].setValue(this.currentUser.rue)
    this.newFav.controls['ville'].setValue(this.currentUser.ville)
    this.newFav.controls['departement'].setValue(this.currentUser.departement)
    this.newFav.controls['latitude'].setValue(this.currentUser.latitude)
    this.newFav.controls['longitude'].setValue(this.currentUser.longitude)
    this.newFav.controls['feedbacksD'].setValue(this.currentUser.feedbacksD)
    this.newFav.controls['feedbacksR'].setValue(this.currentUser.feedbacksD)
    this.newFav.controls['privilege'].setValue(this.currentUser.privilege)
    this.newFav.controls['articles'].setValue(this.currentUser.articles)


    console.log(this.newFav.value)
    console.log(fav.idArticle)


    this.newItem = this.currentUser.articles
    if (fav.producteur != null) {
      this.newItem.push({
        idArticle: fav.idArticle, nom: fav.nom, typearticle: fav.typearticle
        , prix: fav.prix, quantiteDisponible: fav.quantiteDisponible, producteur: { idUser: fav.producteur.idUser }
      })
    }
    else if (fav.commercant != null) {
      this.newItem.push({
        idArticle: fav.idArticle, nom: fav.nom, typearticle: fav.typearticle
        , prix: fav.prix, quantiteDisponible: fav.quantiteDisponible, commercant: { idUser: fav.commercant.idUser }
      })
    } else if (fav.artisant.idUser != null) {
      this.newItem.push({
        idArticle: fav.idArticle, nom: fav.nom, typearticle: fav.typearticle
        , prix: fav.prix, quantiteDisponible: fav.quantiteDisponible, artisant: { idUser: fav.artisant.idUser }
      })
    }
    this.newFav.controls['articles'].setValue(this.newItem)
    console.log(this.newFav.value)

    this.is.ajoutParticulier(this.newFav.value).subscribe(() => {
      this.conServ.connexion(this.newFav.value).subscribe((data: any) => {
        localStorage.setItem('currentUser', JSON.stringify(data))
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      })
      console.log(this.currentUser)

    })
    this.messageService.add({ severity: 'success', summary: ' Sauvé !', detail: 'article ajouté aux favoris' });
  }


  showSuccess() {
    this.messageService.add({ key: 'c', severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
  }


  zoomIn(map) {
    map.setZoom(map.getZoom() + 1);
  }

  findArticles(map) {

    if (this.rechercheForm.value.nom == null || this.rechercheForm.value.nom.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Produit', detail: 'le champ «Produit» est requis' });
    } else if ((this.rechercheForm.value.ville == null || this.rechercheForm.value.ville.nom == null) && !this.enableGeoLoc) {
      this.messageService.add({ severity: 'error', summary: 'Lieu', detail: 'Définir un lieu de recherche' });
    } else {
      this.produitRECHERCHE = this.rechercheForm.value.nom.nom;
      this.villeRECHERCHE = this.rechercheForm.value.ville.nom;
      var laville: any;
      if (this.enableGeoLoc) {
        laville = this.maVille;
      } else {
        laville = this.rechercheForm.value.ville.nom
      }
      this.aServ.findArticles(this.rechercheForm.value.nom.nom, laville).subscribe((data) => {
        this.articlesListe = data
        console.log(this.articlesListe);

        this.rechercheForm.reset()
        this.showResultMessage(this.articlesListe.length)
        this.afficher = false;
        this.afficherResCarte(map)
        this.afficher = true;

      })
    }
  }

  afficherResCarte(map) {
    this.articlesListe
    var echec = 0
    var ok = 0
    for (var i = 0; i < this.articlesListe.length; i++) {
      if (this.articlesListe[i].producteur != null) {
        if (!(this.articlesListe[i].producteur.latitude == 0 || this.articlesListe[i].producteur.latitude == null || this.articlesListe[i].producteur.longitude == 0 || this.articlesListe[i].producteur.longitude == null)) {
          ok = 1
          var lat = this.articlesListe[i].producteur.latitude
          var lng = this.articlesListe[i].producteur.longitude
          this.overlays.push(new google.maps.Marker({ position: { lat: lat, lng: lng }, title: this.articlesListe[i].producteur.nom }));
        } else {
          echec = echec + 1
        } 
      } else if (this.articlesListe[i].artisant != null) {
        if (!(this.articlesListe[i].artisant.latitude == 0 || this.articlesListe[i].artisant.latitude == null || this.articlesListe[i].artisant.longitude == 0 || this.articlesListe[i].artisant.longitude == null)) {
          ok = 1
          var lat = this.articlesListe[i].artisant.latitude
          var lng = this.articlesListe[i].artisant.longitude
          this.overlays.push(new google.maps.Marker({ position: { lat: lat, lng: lng }, title: this.articlesListe[i].artisant.nom }));
        } else {
          echec = echec + 1
        }
      } else if (this.articlesListe[i].commercant != null) {
        if (!(this.articlesListe[i].commercant.latitude == 0 || this.articlesListe[i].commercant.latitude == null || this.articlesListe[i].commercant.longitude == 0 || this.articlesListe[i].commercant.longitude == null)) {
          ok = 1
          var lat = this.articlesListe[i].commercant.latitude
          var lng = this.articlesListe[i].commercant.longitude
          this.overlays.push(new google.maps.Marker({ position: { lat: lat, lng: lng }, title: this.articlesListe[i].commercant.nom }));
        } else {
          echec = echec + 1
        }
      }

    }

    if (echec > 0) {
      this.messageService.add({ severity: 'warn', summary: 'Mise à jour carte', detail: echec + " résultats n'ont pas pu êtres affichés sur la carte, mais tous les résultats sont listés." });
    }

    if (ok == 1 && this.articlesListe.producteur != null) {
      var newCenter = { lat: this.articlesListe[0].producteur.latitude, lng: this.articlesListe[0].producteur.longitude }
      map.setCenter(newCenter)
      map.setZoom(12)
    }
    else if (ok == 1 && this.articlesListe.artisant != null) {
      var newCenter = { lat: this.articlesListe[0].artisant.latitude, lng: this.articlesListe[0].artisant.longitude }
      map.setCenter(newCenter)
      map.setZoom(12)
    }
    else if (ok == 1 && this.articlesListe.commercant != null) {
      var newCenter = { lat: this.articlesListe[0].commercant.latitude, lng: this.articlesListe[0].commercant.longitude }
      map.setCenter(newCenter)
      map.setZoom(12)
    }

  }


  showResultMessage(nb) {
    if (nb == 0) {
      this.messageService.add({ severity: 'warn', summary: 'Aucun résultat', detail: 'pas de résultat pour cette recherche' });
    } else if (nb == 1) {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: this.articlesListe.length + ' résustat' });
    } else {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: this.articlesListe.length + ' résustats' });
    }
  }
  handleOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;
    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
      console.log("OK");
    }
    else {
      console.log("NOK");

    }
  }

  onReject() {
    console.log("ee");
    this.messageService.clear('c');
  }
  geolocalisation(map) {
    if (this.enableGeoLoc) { this.enableGeoLoc = false }
    else {
      this.enableGeoLoc = true
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition((data) => {
          this.myLat = data.coords.latitude
          this.myLng = data.coords.longitude
          this.apiAdresseGouv.getAdresse(this.myLat, this.myLng).subscribe((data) => {
            this.maVille = data
            this.maVille = this.maVille.features[0].properties.city
            this.rechercheForm.controls['ville'].setValue(this.maVille) /*Pas réussi*/
            this.messageService.add({ severity: 'success', summary: 'Mise à jour carte', detail: "Vous avez été localisé à " + this.maVille });
          })
          this.overlays.push(new google.maps.Marker({ position: { lat: this.myLat, lng: this.myLng }, title: "Moi" }));
          this.center = { lat: this.myLat, lng: this.myLng }
          map.setCenter(this.center)
          map.setZoom(12)
        });

    }

  }

  getVilles() {
    this.apiGeoGouv.getVillesList().subscribe((data) => {
      this.dataVilles = data;
      for (var i = 0; i < this.dataVilles.length; i++) {
        this.NomsVilles.push(this.dataVilles[i].nom)
      }
    })
  }

  search(event) {
    let query = event.query;
    var ListeVilles = this.dataVilles
    this.NomsVilles = this.filtrerVille(query, ListeVilles);

  }

  searchArt(event) {
    let query = event.query;
    var ListeArt = this.ListeArticlesEnumData
    this.ListeArticlesEnum = this.filtrerArt(query, ListeArt);

  }
  filtrerVille(query, ListeVilles: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < ListeVilles.length; i++) {
      let ville = ListeVilles[i];
      if (ville.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(ville);
      }
    }
    return filtered;
  }

  filtrerArt(query, ListeArt: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < ListeArt.length; i++) {
      let art = ListeArt[i];
      if (art.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(art);
      }
    }
    return filtered;
  }

  getFruitsLegumes() {
    this.aServ.getFruitsLegumEnum().subscribe((data) => {
      this.temp = data;

      for (var i = 0; i < this.temp.length; i++) {
        this.ListeArticlesEnumData[i] = ({ 'nom': data[i] })
      }
      this.ListeArticlesEnum = data;

    })
  }

  checkConnexion() {
    if (localStorage.getItem('currentUser') != null) {
      this.connected = true;
    } else {
      this.connected = false;
    }
  }

  infosAnnonce(art: any) {
    console.log(art);
    this.nom = art.producteur.nom
    this.Article = art;
  }

  calcul(event: any) {
    this.validateButton = true;
    this.testAchat = false;
    this.nombre = event.target.value
    var nb = this.nombre
    var prix = this.Article.prix
    this.total = nb * prix

  }

  raz() {
    console.log("nice");
    this.achatForm.reset()
    this.total = 0;
    this.validateButton = true;
    this.testAchat = false;
    this.confirmed = false;
  }

  valider() {
    if ((this.nombre > 0 && this.nombre <= this.Article.quantiteDisponible)) {
      this.testAchat = false;
      this.validateButton = false;
    } else {
      this.testAchat = true;
    }
  }

  confirmerAchat() {
    //var qtiteRestant = this.Article.quantiteDisponible - this.nombre

    var idArticle = this.Article.idArticle
    var idUser = JSON.parse(localStorage.getItem('currentUser')).idUser
    var date = this.datepipe.transform(new Date(), 'yyyy-MM-dd')

    this.achatForm.controls['dateAchat'].setValue(date)
    this.achatForm.controls['particulier'].controls['idUser'].setValue(idUser)
    this.achatForm.controls['article'].controls['idArticle'].setValue(idArticle)

    this.choixService.addChoix(this.achatForm.value).subscribe(() => {
      console.log("achat éffectué")
      this.aServ.findArticles(this.produitRECHERCHE, this.villeRECHERCHE).subscribe((dataArt) => {
        this.articlesListe = dataArt
        this.messageService.add({ severity: 'success', summary: 'Achat effectué', detail: 'votre achat a été effectuté' });
      })
    })
  }

}
