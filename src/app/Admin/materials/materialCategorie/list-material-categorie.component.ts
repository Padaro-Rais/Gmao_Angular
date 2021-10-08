import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Categorie } from 'src/app/Models/categorie'
import { CategorieService } from './categorie.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-material-categorie',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>CATEGOEIE MATERIELS</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Nouvelle entrée</b></h3>
      </div>
      <div class="clr-col-9">
        <h3><b>Données disponibles</b></h3>
      </div>
    </div>
    <br />

    <div class="clr-row">
      <div class="clr-col-3">
        <form [formGroup]="formValue">
          <div class="clr-row">
            <div class="clr-col-sm-12 clr-col-md-12">
              <label color="#0F5E80">
                Libelle
                <span class="requi">(*)</span>
              </label>
              <input
                class="form-control form-control-sm"
                type="text"
                name="label_cat"
                formControlName="label_cat"
                required
              />
            </div>
          </div>
          <br />

          <div class="clr-row">
            <div class="clr-col-sm-12 clr-col-md-12">
              <textarea
                class="form-control form-control-sm"
                name="description_cat"
                formControlName="description_cat"
                placeholder="description"
                required
              ></textarea>

              <br />
              <button
                *ngIf="showAdd"
                class="btn btn-primary"
                type="submit"
                (click)="CreateGroupe()"
                [disabled]="!formValue.valid"
              >
                Sauvegarder
              </button>
              <button
                *ngIf="showUp"
                class="btn btn-primary"
                type="submit"
                (click)="UpdateData()"
                [disabled]="!formValue.valid"
              >
                Modifier
              </button>

              <button
                *ngIf="cansel"
                class="btn btn-primary"
                type="submit"
                (click)="Cansel()"
              >
                anuller
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="clr-col-9">
        <clr-datagrid>
          <clr-dg-column [clrDgField]="'label_cat'">Libelle</clr-dg-column>
          <clr-dg-column [clrDgField]="'description_cat'">
            decription
          </clr-dg-column>

          <clr-dg-row *clrDgItems="let categorie of categories">
            <clr-dg-action-overflow>
              <a (click)="Edite(categorie)">
                <button class="action-item">Modifier</button>
              </a>
              <a (click)="deleteData(categorie.id)">
                <button class="action-item">Supprimer</button>
              </a>
            </clr-dg-action-overflow>
            <clr-dg-cell>{{ categorie.label_cat }}</clr-dg-cell>
            <clr-dg-cell>{{ categorie.description_cat }}</clr-dg-cell>
          </clr-dg-row>

          <clr-dg-footer>
            <clr-dg-pagination #pagination [clrDgPageSize]="10">
              <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">
                Categories par page
              </clr-dg-page-size>
              {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} of
              {{ pagination.totalItems }} Categories
            </clr-dg-pagination>
          </clr-dg-footer>
        </clr-datagrid>
      </div>
    </div>
  `,

  styles: [],
})
export class ListMaterialCategorieComponent implements OnInit {
  constructor(
    private service: CategorieService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  formValue!: FormGroup
  categorie: Categorie = new Categorie()
  data: any
  categories: any

  showAdd: boolean = true
  showUp: boolean = false
  cansel: boolean = false
  alert: boolean = false

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      label_cat: [''],
      description_cat: [''],
    })

    this.getData()
  }

  CreateGroupe() {
    this.alert = false
    this.categorie.label_cat = this.formValue.value.label_cat
    this.categorie.description_cat = this.formValue.value.description_cat
    this.service.createGroupe(this.categorie).subscribe(
      (res) => {
        this.toastr.success('sauvegarde reussi !')
        this.formValue.reset()
        this.getData()
      },
      (err) => {
        this.toastr.error('erreur!')
      },
    )
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.categories = this.data.items
    })
  }

  deleteData(_id: any) {
    this.alert = false
    this.service.deleteData(_id).subscribe(
      (res) => {
        this.toastr.success('suppression reussi !')
        this.getData()
      },
      (err) => {
        this.toastr.error('erreur!')
      },
    )
  }

  Edite(row: any) {
    this.showAdd = false
    this.showUp = true
    this.cansel = true

    this.categorie.id = row.id
    this.formValue.controls['label_cat'].setValue(row.label_cat)
    this.formValue.controls['description_cat'].setValue(row.description_cat)
  }

  UpdateData() {
    this.alert = false
    this.categorie.label_cat = this.formValue.value.label_cat
    this.categorie.description_cat = this.formValue.value.description_cat

    this.service.updateData(this.categorie.id, this.categorie).subscribe(
      (res) => {
        this.showAdd = true
        this.showUp = false
        this.cansel = false
        this.toastr.success('modification reussi !')
        this.formValue.reset()
        this.getData()
      },
      (err) => {
        this.toastr.error('erreur!')
      },
    )
  }

  Cansel() {
    this.showUp = false
    this.cansel = false
    this.showAdd = true
    this.formValue.reset()
  }
}
