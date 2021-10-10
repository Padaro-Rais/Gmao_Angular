import { Contrat } from './../../Models/contrat'
import { ContractService } from './contract.service'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { ProviderService } from '../materials/materialProvider/provider.service'
import { MaterialService } from '../materials/material.service'

import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-contract',
  template: `
    <h2 id="titre"><b>CONTRAT DE MAINTENANCE</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Nouvelle entrée</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br/>

    <form novalidate [formGroup]="formGroup" (ngSubmit)="createContract()">
      <div class="row">
        <div class="col">
          <label class="form-label">
            Reference
            <span class="requi">(*)</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            formControlName="ref"
            [ngClass]="{
              'is-invalid':
                formGroup.get('ref').touched && !formGroup.get('ref').valid
            }"
          />
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('ref').errors?.required">
              5 caractères Requis
            </span>
          </div>
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label">
            Valeur
            <span class="requi">(*)</span>
          </label>
          <input
            type="number"
            class="form-control form-control-sm"
            formControlName="value"
            [ngClass]="{
              'is-invalid':
                formGroup.get('value').touched && !formGroup.get('value').valid
            }"
          />
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('value').errors?.required">
              champs requi, format incorect
            </span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label class="form-label">
            Debut
            <span class="requi">(*)</span>
          </label>
          <input
            type="date"
            class="form-control form-control-sm"
            name="start_date"
            formControlName="start_date"
            [ngClass]="{
              'is-invalid':
                formGroup.get('start_date').touched &&
                !formGroup.get('start_date').valid
            }"
          />
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('start_date').errors?.required">
              Ce champs est requi
            </span>
          </div>
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label">
            Fin
            <span class="requi">(*)</span>
          </label>
          <input
            type="date"
            class="form-control form-control-sm"
            name="end_date"
            formControlName="end_date"
            [ngClass]="{
              'is-invalid':
                formGroup.get('end_date').touched &&
                !formGroup.get('end_date').valid
            }"
          />
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('end_date').errors?.required">
              ce champs est requi
            </span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label class="form-label">
            Materiel
            <span class="requi">(*)</span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            formControlName="material_id"
            [ngClass]="{
              'is-invalid':
                formGroup.get('material_id').touched &&
                !formGroup.get('material_id').valid
            }"
          >
            <option selected>Selectionner le Materiel</option>
            <option *ngFor="let material of material" value="{{ material.id }}">
              {{ material.label }}
            </option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('material_id').errors?.required">
              ce champs est requi
            </span>
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
            formControlName="provider_id"
            [ngClass]="{
              'is-invalid':
                formGroup.get('provider_id').touched &&
                !formGroup.get('provider_id').valid
            }"
          >
            <option selected>Selectionner le Prestataire</option>
            <option
              *ngFor="let provider of providers"
              value="{{ provider.id }}"
            >
              {{ provider.social_reason }}
            </option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('provider_id').errors?.required">
              ce champs est requi
            </span>
          </div>
        </div>
      </div>
      <br />

      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Conditions
          <span class="requi">(*)</span>
        </label>
        <textarea
          class="form-control"
          rows="3"
          formControlName="conditions"
          [ngClass]="{
            'is-invalid':
              formGroup.get('conditions').touched &&
              !formGroup.get('conditions').valid
          }"
        ></textarea>

        <div class="invalid-feedback">
          <span *ngIf="formGroup.get('conditions').errors?.required"></span>
        </div>
      </div>

      <br />
      <div class="col-12">
        <button
          class="btn btn-primary"
          type="submit"
          [disabled]="!formGroup.valid"
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
export class AddContractComponent implements OnInit {
  constructor(
    private service: ContractService,
    private serviceP: ProviderService,
    private serviceM: MaterialService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  formGroup: any

  data: any
  material: any
  providers: any

  contrat = new Contrat()

  ngOnInit(): void {
    this.getData()
    this.initForm()
  }

  initForm() {
    this.formGroup = this.fb.group(
      {
        ref: [
          '',
          [
            Validators.required,
            Validators.maxLength(5),
            Validators.minLength(5),
          ],
        ],
        value: ['', [Validators.required]],
        start_date: ['', [Validators.required]],
        end_date: ['', [Validators.required]],
        conditions: ['', [Validators.required]],
        material_id: ['', [Validators.required]],
        provider_id: ['', [Validators.required]],
      },
      { validator: this.dateLessThan('start_date', 'end_date') },
    )
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from]
      let t = group.controls[to]
      if (f.value > t.value) {
        return {
          dates: 'Date from should be less than Date to',
        }
      }
      return {}
    }
  }

  getData() {
    this.serviceM.getData().subscribe((res) => {
      this.data = res
      this.material = this.data.items
    })

    this.serviceP.getData().subscribe((res) => {
      this.data = res
      this.providers = this.data.items
    })
  }

  createContract() {
    this.service.createContract(this.formGroup.value).subscribe(
      (res) => {
        this.toastr.success('sauvegarde reuissi !')
      },

      (err) => {
        this.toastr.error('veuillez réessayer svp !', 'une erreur produite')
      },
    )
  }

  cansel() {
    this.router.navigateByUrl('/app/contracts')
  }
}
