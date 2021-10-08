import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Provider } from 'src/app/Models/provider'
import { ProviderService } from './provider.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-material-provider',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>PRESTATAIRES MATERIELS</b></h2>
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
          <label>
            Raison sociale (Nom)
            <span class="requi">(*)</span>
          </label>
          <input
            class="form-control form-control-sm"
            type="text"
            name="social_reason"
            maxlength="25"
            formControlName="social_reason"
            required
          />

          <label>
            Adresse
            <span class="requi">(*)</span>
          </label>
          <input
            class="form-control form-control-sm"
            type="text"
            name="address"
            formControlName="address"
            required
          />

          <label>
            Telephone
            <span class="requi">(*)</span>
          </label>
          <input
            class="form-control form-control-sm"
            type="number"
            name="phone_number"
            formControlName="phone_number"
            required
          />

          <label>
            Email
            <span class="requi">(*)</span>
          </label>
          <input
            class="form-control form-control-sm"
            type="email"
            name="email"
            formControlName="email"
            required
          />

          <br />
          <button
            *ngIf="showAdd"
            class="btn btn-primary"
            type="submit"
            (click)="createProvider()"
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
        </form>
      </div>
      <div class="clr-col-9">
        <clr-datagrid>
          <clr-dg-column [clrDgField]="'social_reason'">Libelle</clr-dg-column>
          <clr-dg-column [clrDgField]="'address'">Addresse</clr-dg-column>
          <clr-dg-column [clrDgField]="'phone_number'">Téléphone</clr-dg-column>
          <clr-dg-column [clrDgField]="'email'">email</clr-dg-column>

          <clr-dg-row *clrDgItems="let provider of providers">
            <clr-dg-action-overflow>
              <a (click)="Edite(provider)">
                <button class="action-item">Modifier</button>
              </a>
              <a (click)="deleteData(provider.id)">
                <button class="action-item">Supprimer</button>
              </a>
            </clr-dg-action-overflow>

            <clr-dg-cell>{{ provider.social_reason }}</clr-dg-cell>
            <clr-dg-cell>{{ provider.address }}</clr-dg-cell>
            <clr-dg-cell>{{ provider.phone_number }}</clr-dg-cell>
            <clr-dg-cell>{{ provider.email }}</clr-dg-cell>
          </clr-dg-row>

          <clr-dg-footer>
            <clr-dg-pagination #pagination [clrDgPageSize]="10">
              <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">
                Prestataires par page
              </clr-dg-page-size>
              {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} ..
              {{ pagination.totalItems }} Prestataires
            </clr-dg-pagination>
          </clr-dg-footer>
        </clr-datagrid>
      </div>
    </div>
  `,
  styles: [],
})
export class ListMaterialProviderComponent implements OnInit {
  constructor(
    private service: ProviderService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  formValue!: FormGroup
  provider: Provider = new Provider()

  data: any
  providers: any

  showAdd: boolean = true
  showUp: boolean = false
  cansel: boolean = false
  alert: boolean = false

  createProvider() {
    this.alert = false
    this.provider.social_reason = this.formValue.value.social_reason
    this.provider.address = this.formValue.value.address
    this.provider.phone_number = this.formValue.value.phone_number
    this.provider.email = this.formValue.value.email
    this.service.createProvider(this.provider).subscribe(
      (res) => {
        this.toastr.success('sauvegarde reuissi !')
        this.formValue.reset()
        this.getData()
      },
      (err) => {
        this.toastr.error(
          'veuillez vérifier et réessayer svp !',
          'information incorect',
        )
      },
    )
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      social_reason: [''],
      address: [''],
      phone_number: [''],
      email: [''],
    })

    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.providers = this.data.items
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
    this.provider.id = row.id
    this.formValue.controls['social_reason'].setValue(row.social_reason)
    this.formValue.controls['address'].setValue(row.address)
    this.formValue.controls['phone_number'].setValue(row.phone_number)
    this.formValue.controls['email'].setValue(row.email)
  }

  UpdateData() {
    this.alert = false
    this.provider.social_reason = this.formValue.value.social_reason
    this.provider.address = this.formValue.value.address
    this.provider.phone_number = this.formValue.value.phone_number
    this.provider.email = this.formValue.value.email
    this.service.updateData(this.provider.id, this.provider).subscribe(
      (res) => {
        this.showAdd = true
        this.showUp = false
        this.cansel = false
        this.toastr.success('modification reuissi !')
        this.formValue.reset()
        this.getData()
      },
      (err) => {
        this.toastr.error('veuillez réessayer svp !', 'une erreur produite')
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
