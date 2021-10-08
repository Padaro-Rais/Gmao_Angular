import { FormBuilder, FormGroup } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { ServiceGroupeService } from './service-groupe.service'
import '@cds/core/tag/register.js'
import { Groupe } from 'src/app/Models/groupe'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-material-group',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>GROUPE MATERIELS</b></h2>
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
              <label>
                Libelle
                <span class="requi">(*)</span>
              </label>
              <input
                class="form-control form-control-sm"
                type="text"
                name="label"
                formControlName="label"
                required
              />

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
          <br />
        </form>
      </div>
      <div class="clr-col-9">
        <clr-datagrid>
          <clr-dg-column [clrDgField]="'label'">Label</clr-dg-column>
          <clr-dg-row *clrDgItems="let group of groupes">
            <clr-dg-action-overflow>
              <a (click)="Edite(group)">
                <button class="action-item">Modifier</button>
              </a>
              <a (click)="deleteData(group.id)">
                <button class="action-item">Supprimer</button>
              </a>
            </clr-dg-action-overflow>
            <clr-dg-cell>{{ group.label }}</clr-dg-cell>
          </clr-dg-row>

          <clr-dg-footer>
            <clr-dg-pagination #pagination [clrDgPageSize]="10">
              <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">
                Groupes par page
              </clr-dg-page-size>
              {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} ..
              {{ pagination.totalItems }} Groupes
            </clr-dg-pagination>
          </clr-dg-footer>
        </clr-datagrid>
      </div>
    </div>
  `,
  styles: [],
})
export class ListMaterialGroupComponent implements OnInit {
  formValue!: FormGroup
  groupe: Groupe = new Groupe()
  data: any
  groupes: any

  showAdd: boolean = true
  showUp: boolean = false
  cansel: boolean = false
  alert: boolean = false

  constructor(
    private service: ServiceGroupeService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  CreateGroupe() {
    this.alert = false
    this.groupe.label = this.formValue.value.label
    this.service.createGroupe(this.groupe).subscribe(
      (res) => {
        this.toastr.success('sauvegarde reuissi !')
        this.formValue.reset()
        this.getData()
      },
      (err) => {
        this.toastr.error('une erreur produite !', 'veuillez réessayer')
      },
    )
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      label: [''],
    })
    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.groupes = this.data.items
    })
  }

  deleteData(_id: any) {
    var res = confirm('Êtes-vous sûr de vouloir supprimer?')
    if (res) {
      this.service.deleteData(_id).subscribe(
        (res) => {
          this.toastr.success('suppression reuissi !')
          this.getData()
        },
        (err) => {
          this.toastr.error('une erreur produite !', 'veuillez réessayer')
        },
      )
    }
  }

  Edite(row: any) {
    this.showAdd = false
    this.showUp = true
    this.cansel = true
    this.groupe.id = row.id
    this.formValue.controls['label'].setValue(row.label)
  }

  UpdateData() {
    this.alert = false
    this.groupe.label = this.formValue.value.label
    this.service.updateData(this.groupe.id, this.groupe).subscribe(
      (res) => {
        this.showAdd = true
        this.showUp = false
        this.cansel = false
        this.toastr.success('modification reussi !')
        this.formValue.reset()
        this.getData()
      },
      (err) => {
        this.toastr.error('une erreur produite !', 'veuillez réessayer')
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
