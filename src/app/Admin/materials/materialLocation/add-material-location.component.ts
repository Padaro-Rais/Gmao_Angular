import { FormGroup } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { Location } from 'src/app/Models/location'
import { LocationService } from './location.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-material-location',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>ADRESSE MATERIELS</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Nouvelle entrée</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />

    <form (ngSubmit)="createLocation()" #registerForm="ngForm">
      <div class="row">
        <div class="col">
          <label class="form-label">
            Reference
            <span class="requi">(*)</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="ref"
            id="ref"
            #ref="ngModel"
            placeholder=""
            required
            maxlength="5"
            minlength="5"
            [(ngModel)]="location.ref"
            [ngClass]="{ 'is-invalid': ref.touched && !ref.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="ref.errors">5 caractères requis</span>
          </div>
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label">
            Adresse physique
            <span class="requi">(*)</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="addresse"
            id="addresse"
            #addresse="ngModel"
            [(ngModel)]="location.physical_address"
            required
            maxlength="15"
            [ngClass]="{ 'is-invalid': addresse.touched && !addresse.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="addresse.errors">ce champs est requis</span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label for="exampleFormControlInput1" class="form-label">
            structure
            <span class="requi">(*)</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="label"
            id="label"
            placeholder=""
            #label="ngModel"
            [(ngModel)]="location.location_label"
            required
            maxlength="20"
            [ngClass]="{ 'is-invalid': label.touched && !addresse.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="label.errors">ce champs est requis</span>
          </div>
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label">
            Quartier
            <span class="requi">(*)</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="quartier"
            id="quartier"
            #quartier="ngModel"
            [(ngModel)]="location.quartier"
            required
            maxlength="20"
            [ngClass]="{ 'is-invalid': quartier.touched && !quartier.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="quartier.errors">ce champs est requis</span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label class="form-label">
            Ville
            <span class="requi">(*)</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="ville"
            name="ville"
            #ville="ngModel"
            placeholder=""
            [(ngModel)]="location.ville"
            required
            maxlength="20"
            [ngClass]="{ 'is-invalid': ville.touched && !ville.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="ville.errors">ce champs est requis</span>
          </div>
        </div>

        <div class="col">
          <label class="form-label">
            Pays
            <span class="requi">(*)</span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            name="pays"
            id="pays"
            #pay="ngModel"
            required
            [(ngModel)]="location.pays"
            [ngClass]="{ 'is-invalid': pay.touched && !pay.valid }"
          >
            <option selected>Selectionner le pays</option>
            <option *ngFor="let item of pays">{{ item.name }}</option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="pay.errors">ce champs est requis</span>
          </div>
        </div>

        <div class="col-12">
          <br />
          <br />
          <button
            class="btn btn-primary"
            type="submit"
            [disabled]="!registerForm.valid"
          >
            SAUVEGARDER
          </button>

          <button class="btn btn-primary" (click)="cansel()">
            RETOUR
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [],
})
export class AddMaterialLocationComponent implements OnInit {
  constructor(
    private service: LocationService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  location = new Location()

  showbt: boolean = true

  pays: any = [
    { name: 'Afrique du Sud' },
    { name: 'Afghanistan' },
    { name: 'Albanie' },
    { name: 'Algérie' },
    { name: 'Allemagne' },
    { name: 'Angola 	Luanda' },
    { name: 'Antigua-et-Barbuda' },
    { name: 'Arabie Saoudite' },
    { name: 'Argentine' },
    { name: 'Arménie' },
    { name: 'Australie' },
    { name: 'Autriche' },
    { name: 'Azerbaïdjan' },
    { name: 'Bahamas' },
    { name: 'Bahreïn' },
    { name: 'Bangladesh' },
    { name: 'Barbade' },
    { name: 'Belgique' },
    { name: 'Belize' },
    { name: 'Bénin' },
    { name: 'Bhoutan' },
    { name: 'Biélorussie' },
    { name: 'Birmanie' },
    { name: 'Bolivie' },
    { name: 'Bosnie-Herzégovine' },
    { name: 'Botswana' },
    { name: 'Brésil' },
    { name: 'Brunei' },
    { name: 'Bulgarie' },
    { name: 'Burkina Faso' },
    { name: 'Burundi' },
    { name: 'Cambodge' },
    { name: 'Cameroun' },
    { name: 'Canada' },
    { name: 'Cap-Vert' },
    { name: 'Chili' },
    { name: 'Chine' },
    { name: 'Chypre' },
    { name: 'Colombie' },
    { name: 'Comores' },
    { name: 'Corée du Nord' },
    { name: 'Corée du Sud' },
    { name: 'Costa Rica' },
    { name: 'Côte d’Ivoire' },
    { name: 'Croatie' },
    { name: 'Cuba' },
    { name: 'Danemark' },
    { name: 'Djibouti' },
    { name: 'Dominique' },
    { name: 'Égypte 	Le Caire' },
    { name: 'Émirats arabes unis' },
    { name: 'Équateur' },
    { name: 'Érythrée' },
    { name: 'Espagne' },
    { name: 'Eswatini' },
    { name: 'Estonie' },
    { name: 'États-Unis' },
    { name: 'Éthiopie' },
    { name: 'Fidji' },
    { name: 'Finlande' },
    { name: 'France' },
    { name: 'Gabon' },
    { name: 'Gambie' },
    { name: 'Géorgie' },
    { name: 'Ghana' },
    { name: 'Grèce' },
    { name: 'Grenade' },
    { name: 'Guatemala' },
    { name: 'Guinée 	Conakry' },
    { name: 'Guinée équatoriale' },
    { name: 'Guinée-Bissau' },
    { name: 'Guyana' },
    { name: 'Haïti' },
    { name: 'Honduras' },
    { name: 'Hongrie' },
    { name: 'Îles Cook' },
    { name: 'Îles Marshall' },
    { name: 'Inde' },
    { name: 'Indonésie' },
    { name: 'Irak' },
    { name: 'Iran' },
    { name: 'Irlande' },
    { name: 'Islande' },
    { name: 'Israël' },
    { name: 'Italie' },
    { name: 'Jamaïque' },
    { name: 'Japon' },
    { name: 'Jordanie' },
    { name: 'Kazakhstan' },
    { name: 'Kenya' },
    { name: 'Kirghizistan' },
    { name: 'Kiribati' },
    { name: 'Koweït' },
    { name: 'Laos' },
    { name: 'Lesotho' },
    { name: 'Lettonie' },
    { name: 'Liban' },
    { name: 'Liberia' },
    { name: 'Libye' },
    { name: 'Liechtenstein' },
    { name: 'Lituanie' },
    { name: 'Luxembourg' },
    { name: 'Macédoine' },
    { name: 'Madagascar' },
    { name: 'Malaisie' },
    { name: 'Malawi' },
    { name: 'Maldives' },
    { name: 'Mali' },
    { name: 'Malte' },
    { name: 'Maroc' },
    { name: 'Maurice' },
    { name: 'Mauritanie' },
    { name: 'Mexique' },
    { name: 'Micronésie' },
    { name: 'Moldavie' },
    { name: 'Monaco' },
    { name: 'Mongolie' },
    { name: 'Monténégro' },
    { name: 'Mozambique' },
    { name: 'Namibie' },
    { name: 'Nauru' },
    { name: 'Népal' },
    { name: 'Nicaragua' },
    { name: 'Niger' },
    { name: 'Nigeria' },
    { name: 'Niue' },
    { name: 'Norvège' },
    { name: 'Nouvelle-Zélande' },
    { name: 'Oman' },
    { name: 'Ouganda' },
    { name: 'Ouzbékistan' },
    { name: 'Pakistan' },
    { name: 'Palaos' },
    { name: 'Palestine' },
    { name: 'Panama' },
    { name: 'Papouasie-Nouvelle-Guinée' },
    { name: 'Paraguay' },
    { name: 'Pays-Bas' },
    { name: 'Pérou' },
    { name: 'Philippines' },
    { name: 'Pologne' },
    { name: 'Portugal' },
    { name: 'Qatar' },
    { name: 'République centrafricaine' },
    { name: 'République démocratique du Congo' },
    { name: 'République Dominicaine' },
    { name: 'République du Congo' },
    { name: 'République' },
    { name: 'Roumanie' },
    { name: 'Royaume-Uni' },
    { name: 'Russie' },
    { name: 'Rwanda' },
    { name: 'Saint-Kitts-et-Nevis' },
    { name: 'Saint-Vincent-et-les-Grenadines' },
    { name: 'Sainte-Lucie' },
    { name: 'Saint-Marin' },
    { name: 'Salomon' },
    { name: 'Salvador' },
    { name: 'Samoa' },
    { name: 'São Tomé-et-Principe' },
    { name: 'Sénégal' },
    { name: 'Serbie' },
    { name: 'Seychelles' },
    { name: 'Sierra Leone' },
    { name: 'Singapour' },
    { name: 'Slovaquie' },
    { name: 'Slovénie' },
    { name: 'Somalie' },
    { name: 'Soudan' },
    { name: 'Soudan du Sud' },
    { name: 'Sri Lanka' },
    { name: 'Suède' },
    { name: 'Suisse' },
    { name: 'Suriname' },
    { name: 'Syrie' },
    { name: 'Tadjikistan' },
    { name: 'Tanzanie' },
    { name: 'Tchad' },
    { name: 'Thaïlande' },
    { name: 'Timor oriental' },
    { name: 'Togo' },
    { name: 'Tonga' },
    { name: 'Trinité-et-Tobago' },
    { name: 'Tunisie' },
    { name: 'Turkménistan' },
    { name: 'Turquie' },
    { name: 'Tuvalu' },
    { name: 'Ukraine' },
    { name: 'Uruguay' },
    { name: 'Vanuatu' },
    { name: 'Vatican' },
    { name: 'Venezuela' },
    { name: 'Viêt Nam' },
    { name: 'Yémen' },
    { name: 'Zambie' },
    { name: 'Zimbabwe' },
  ]

  ngOnInit(): void {}

  createLocation() {
    this.showbt = false

    this.service.createLocation(this.location).subscribe(
      (res) => {
        this.toastr.success('Sauvegarde reuissi !')
      },
      (err) => {
        this.showbt = true
        this.toastr.error('une erreur produite !', 'veuillez réessayer')
      },
    )
  }

  cansel() {
    this.router.navigateByUrl('/app/materialLocation')
  }
}
