import { MaterialService } from './material.service'
import { Component, OnInit } from '@angular/core'
import { ServiceGroupeService } from './materialGroup/service-groupe.service'
import { CategorieService } from './materialCategorie/categorie.service'
import { LocationService } from './materialLocation/location.service'
import { ProviderService } from './materialProvider/provider.service'
import { Router } from '@angular/router'
import { Materiel } from 'src/app/Models/materiel'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-material',
  template: `
    <h2 id="titre"><b>MATERIELS</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Nouvelle entrée</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br/>

    <form (ngSubmit)="createMaterial()" #registerForm="ngForm">
      <div class="row">
        <div class="col">
          <label class="form-label">
            Nom
            <span class="requi">(*)</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="label"
            #label="ngModel"
            placeholder=""
            maxlength="60"
            minlength="3"
            [(ngModel)]="material.label"
            required
            [ngClass]="{ 'is-invalid': label.touched && !label.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="label.errors">
              ce champs est requis (20 caractères maximum)
            </span>
          </div>
        </div>
        <div class="col">
          <label class="form-label">
            Date d'acquisition
            <span class="requi">(*)</span>
          </label>
          <input
            class="form-control form-control-sm"
            #date="ngModel"
            type="date"
            name="supplied_at"
            required
            [(ngModel)]="material.supplied_at"
            [ngClass]="{ 'is-invalid': date.touched && !date.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="date.errors">ce champs est requis</span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label class="form-label">
             Garantie
            <span class="requi">(*)</span>
          </label>
          <input
            type="number"
            class="form-control form-control-sm"
            name="durations"
            #durations="ngModel"
            placeholder="Nombre de jours"
            [(ngModel)]="material.duration"
            required
            [ngClass]="{ 'is-invalid': durations.touched && !durations.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="durations.errors">ce champs est requis</span>
          </div>
        </div>
        <div class="col">
          <label for="exampleFormControlTextarea1" class="form-label">
            Description
          </label>
          <textarea
            class="form-control"
            rows="3"
            [(ngModel)]="material.description"
            name="description"
          ></textarea>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label class="form-label">
            Prix d'acquisition
            <span class="requi">(*)</span>
          </label>
          <input
            type="number"
            class="form-control form-control-sm"
            name="prix"
            #prix="ngModel"
            placeholder=""
            required
            [(ngModel)]="material.price"
            [ngClass]="{ 'is-invalid': prix.touched && !prix.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="prix.errors">ce champs est requis</span>
          </div>
        </div>
        <div class="col">
          <label class="form-label">
            Durée de vie
            <span class="requi">(*)</span>
          </label>
          <input
            class="form-control form-control-sm"
            type="number"
            placeholder="nombre de jours"
            name="lifetime"
            #lifetime="ngModel"
            required
            [(ngModel)]="material.material_lifetime"
            [ngClass]="{ 'is-invalid': lifetime.touched && !lifetime.valid }"
          />
          <div class="invalid-feedback">
            <span *ngIf="lifetime.errors">ce champs est requis</span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label class="form-label">
            Groupe
            <span class="requi">(*)</span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            #groupe="ngModel"
            name="material_groups_id"
            [(ngModel)]="material.material_groups_id"
            required
            [ngClass]="{ 'is-invalid': groupe.touched && !groupe.valid }"
          >
            <option selected>Selectionner le groupe</option>
            <option *ngFor="let groupe of groupes" value="{{ groupe.id }}">
              {{ groupe.label }}
            </option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="groupe.errors">ce champs est requis</span>
          </div>
        </div>

        <div class="col">
          <label class="form-label">
            Categorie
            <span class="requi">(*)</span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            id="pays"
            #categorie="ngModel"
            name="material_category_id"
            [(ngModel)]="material.material_category_id"
            required
            [ngClass]="{ 'is-invalid': categorie.touched && !categorie.valid }"
          >
            <option selected>Selectionner la Categorie</option>
            <option
              *ngFor="let categorie of categories"
              value="{{ categorie.id }}"
            >
              {{ categorie.label_cat }}
            </option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="categorie.errors">ce champs est requis</span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label class="form-label">
            Lacalisation
            <span class="requi">(*)</span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            #addresse="ngModel"
            name="material_address_id"
            [(ngModel)]="material.material_address_id"
            required
            [ngClass]="{ 'is-invalid': addresse.touched && !addresse.valid }"
          >
            <option selected>Selectionner la Lacalisation</option>
            <option
              *ngFor="let location of locations"
              value="{{ location.id }}"
            >
              {{ location.ref }}
            </option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="addresse.errors">ce champs est requis</span>
          </div>
        </div>

        <div class="col">
          <label class="form-label">
            Prestataire
            <span class="requi">(*)</span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            #provider="ngModel"
            name="material_contractor_id"
            [(ngModel)]="material.material_contractor_id"
            required
            [ngClass]="{ 'is-invalid': provider.touched && !provider.valid }"
          >
            <option selected>Selectionner le prestataire</option>
            <option
              *ngFor="let provider of providers"
              value="{{ provider.id }}"
            >
              {{ provider.social_reason }}
            </option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="provider.errors">ce champs est requis</span>
          </div>
        </div>
      </div>
      <br />

      <div class="col">
        <label class="form-label">
          Image
          <span class="requi">(*)</span>
        </label>
        <input
          type="file"
          class="form-control form-control-sm"
          id="image"
          name="image"
          (change)="onFileSelected($event)"
          #profile="ngModel"
          [(ngModel)]="material.img"
          required
          [ngClass]="{ 'is-invalid': profile.touched && !profile.valid }"
        />
        <div class="invalid-feedback">
          <span *ngIf="profile.errors">ce champs est requis</span>
        </div>
      </div>
      <br />

      <div class="col-12">
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
    </form>
  `,
  styles: [],
})
export class AddMaterialComponent implements OnInit {
  constructor(
    private serviceG: ServiceGroupeService,
    private serviceC: CategorieService,
    private serviceL: LocationService,
    private serviceP: ProviderService,
    private serviceM: MaterialService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  material = new Materiel()
  selectedFile: any

  data: any
  groupes: any
  categories: any
  locations: any
  providers: any

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.serviceG.getData().subscribe((res) => {
      this.data = res
      this.groupes = this.data.items
    })

    this.serviceC.getData().subscribe((res) => {
      this.data = res
      this.categories = this.data.items
    })

    this.serviceL.getData().subscribe((res) => {
      this.data = res
      this.locations = this.data.items
    })

    this.serviceP.getData().subscribe((res) => {
      this.data = res
      this.providers = this.data.items
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
    console.log(event)
  }

  createMaterial() {
    const formData = new FormData()
    formData.append('label', this.material.label)
    formData.append('duration', this.material.duration)
    formData.append('description', this.material.description)
    formData.append('material_groups_id', this.material.material_groups_id)
    formData.append('material_category_id', this.material.material_category_id)
    formData.append('material_address_id', this.material.material_address_id)
    formData.append(
      'material_contractor_id',
      this.material.material_contractor_id,
    )
    formData.append('supplied_at', this.material.supplied_at)
    formData.append('price', this.material.price)
    formData.append('material_lifetime', this.material.material_lifetime)
    formData.append('img', this.selectedFile)

    this.serviceM.createMaterial(formData).subscribe(
      (res) => {
        // this.material.duration =""
        // this.material.description =""
        // this.material.material_groups_id =""
        // this.material.material_category_id =""
        // this.material.material_address_id =""
        // this.material.material_contractor_id =""
        // this.material.supplied_at =""
        // this.material.price =""
        // this.material.material_lifetime =""
        // this.selectedFile =""

        this.toastr.success('sauvegarde reuissi !')
      },
      (err) => {
        this.toastr.error('veuillez réessayer svp !', 'une erreur produite')
      },
    )
  }

  cansel() {
    this.router.navigateByUrl('/app/materials')
  }
}
