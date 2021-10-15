import { RouterLink } from '@angular/router'
import { LocationService } from './location.service'
import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Location } from 'src/app/Models/location'

@Component({
  selector: 'app-list-material-location',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>ADRESSES MATERIELS</b></h2>
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
              <div>



              <label class="form-label">
                local
                <span class="requi">(*)</span>
              </label>
              <select
                class="form-select form-select-sm"
                aria-label="Default select example"
                formControlName="local_code"
                required
              >
                <option *ngFor="let local of locals" value="{{ local.code }}">
                  {{ local.code }}
                </option>
              </select>
              <div class="invalid-feedback"></div>
              <br />
              </div>

              <label>
                libellé
                <span class="requi">(*)</span>
              </label>
              <input
                class="form-control form-control-sm"
                formControlName="location_label"
                required
              />
              <br />

              <button
                *ngIf="showAdd"
                class="btn btn-primary"
                type="submit"
                (click)="CreateLocation()"
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
          <clr-dg-column [clrDgField]="'code'">reference</clr-dg-column>
          <clr-dg-column [clrDgField]="'location_label'">Libelle</clr-dg-column>

          <clr-dg-row *clrDgItems="let location of locations">
            <clr-dg-action-overflow>
              <a (click)="Edite(location)">
                <button class="action-item">Modifier</button>
              </a>
              <a (click)="deleteData(location.id)">
                <button class="action-item">Supprimer</button>
              </a>
            </clr-dg-action-overflow>
            <clr-dg-cell>{{ location.code }}</clr-dg-cell>
            <clr-dg-cell>{{ location.location_label }}</clr-dg-cell>
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
export class ListMaterialLocationComponent implements OnInit {
  formValue!: FormGroup
  location: Location = new Location()
  data: any
  locations: any
  locals: any

  showAdd: boolean = true
  showUp: boolean = false
  cansel: boolean = false
  alert: boolean = false
  code: boolean = false
  local: boolean = true


  constructor(
    private service: LocationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  CreateLocation() {
    this.alert = false
    this.location.location_label = this.formValue.value.location_label
    this.location.local_code = this.formValue.value.local_code

    this.service.createLocation(this.location).subscribe(
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
      location_label: [''],
      local_code: [''],
      code:['']
    })

    this.service.getlocal().subscribe((res) => {
      this.data = res
      this.locals = this.data.items
      console.log(this.locals)
    })

    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.locations = this.data.items
      console.log(this.locations)
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
    this.code = true
    this.local = false

    this.location.id = row.id
    this.formValue.controls['location_label'].setValue(row.location_label)
    this.formValue.controls['local_code'].setValue(row.local_code)
  }

  UpdateData() {
    this.alert = false
    this.location.location_label = this.formValue.value.location_label
    this.location.local_code = this.formValue.value.local_code
    this.location.code = this.formValue.value.local_code +'>'+ this.formValue.value.location_label
    this.service.updateData(this.location.id, this.location).subscribe(
      (res) => {
        this.showAdd = true
        this.showUp = false
        this.cansel = false
        this.toastr.success('modification reussi !')
        this.getData()
        this.formValue.reset()
        this.formValue.reset()
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
    this.code = false
    this.local = true,
    this.formValue.reset()
  }
}
