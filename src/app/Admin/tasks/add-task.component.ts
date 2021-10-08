import { Materiel } from 'src/app/Models/materiel'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Tache } from 'src/app/Models/tache'
import { ContractService } from '../Contracts/contract.service'
import { MaterialService } from '../materials/material.service'
import { UsersService } from '../users/users.service'
import { TasksService } from './tasks.service'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { ProviderService } from '../materials/materialProvider/provider.service'

import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-task',
  template: `
    <h2 id="titre"><b>PLANIFICATION DE TACHES</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Nouvelle entrée</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />

    <form novalidate [formGroup]="formGroup" (ngSubmit)="createtask()">
      <div class="row">
        <div class="mb-3">
          <label class="form-label">
            Type de tache
            <span class="requi">(*)</span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            name="task_type_id"
            required
            formControlName="task_type_id"
            [ngClass]="{
              'is-invalid':
                formGroup.get('task_type_id').touched &&
                !formGroup.get('task_type_id').valid
            }"
          >
            <option value="{{ 1 }}">MAINTENANCE</option>
            <option value="{{ 2 }}">OPERATION</option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('task_type_id').errors?.required">
              ce champs est requis
            </span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label for="exampleFormControlTextarea1" class="form-label">
            Description
            <span class="requi">(*)</span>
          </label>
          <textarea
            class="form-control"
            rows="3"
            placeholder="decription de la tache"
            formControlName="description"
            [ngClass]="{
              'is-invalid':
                formGroup.get('description').touched &&
                !formGroup.get('description').valid
            }"
          ></textarea>

          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('description').errors?.required">
              ce champs est requis (20 caractère minimum)
            </span>
          </div>
        </div>

        <div class="col">
          <label class="form-label">
            Priorité
            <span class="requi">(*)</span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            name="level"
            required
            formControlName="level"
            [ngClass]="{
              'is-invalid':
                formGroup.get('level').touched && !formGroup.get('level').valid
            }"
          >
            <option value="{{ 2 }}">Elevé</option>
            <option value="{{ 1 }}">Faible</option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('level').errors?.required">
              ce champs est requis
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
            formControlName="start_date"
            [ngClass]="{
              'is-invalid':
                formGroup.get('start_date').touched &&
                !formGroup.get('start_date').valid
            }"
          />
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('start_date').errors?.required">
              ce champs est requis
            </span>
          </div>
        </div>

        <div class="col">
          <label class="form-label">
            Fin
            <span class="requi">(*)</span>
          </label>
          <input
            type="date"
            class="form-control form-control-sm"
            formControlName="end_date"
            [ngClass]="{
              'is-invalid':
                formGroup.get('end_date').touched &&
                !formGroup.get('end_date').valid
            }"
          />
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('end_date').errors?.required">
              ce champs est requis
            </span>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col">
          <label class="form-label">
            Contrat
            <span class="requi"></span>
          </label>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
            name="contrat_id"
            formControlName="contrat_id"
            [ngClass]="{
              'is-invalid':
                formGroup.get('contrat_id').touched &&
                !formGroup.get('contrat_id').valid
            }"
          >
            <option *ngFor="let contrat of contrats" value="{{ contrat.id }}">
              {{ contrat.contract.ref }}
            </option>
          </select>
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('contrat_id').errors?.required">
              ce champs est requis
            </span>
          </div>
        </div>

        <div class="col">
          <label class="form-label">
            Nom Prestatire groupe
            <span class="requi"></span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            formControlName="label"
            [ngClass]="{
              'is-invalid':
                formGroup.get('label').touched && !formGroup.get('label').valid
            }"
          />
          <div class="invalid-feedback">
            <span *ngIf="formGroup.get('label').errors?.required">
              ce champs est requis
            </span>
          </div>
        </div>
      </div>
      <br />

      <div class="mb-3">
        <label class="form-label">
          Prestataire(s)
          <span class="requi">(*)</span>
        </label>
        <select
          class="form-select form-select-sm"
          aria-label="Default select example"
          name="materiel"
          required
          multiple
          formControlName="users"
          [ngClass]="{
            'is-invalid':
              formGroup.get('users').touched && !formGroup.get('users').valid
          }"
        >
          <option *ngFor="let user of users" value="{{ user.id }}">
            {{ user.social_reason }}
          </option>
        </select>
        <div class="invalid-feedback">
          <span *ngIf="formGroup.get('users').errors?.required">
            ce champs est requis
          </span>
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
export class AddTaskComponent implements OnInit {
  constructor(
    private serviceM: MaterialService,
    private serviceU: ProviderService,
    private serviceC: ContractService,
    private service: TasksService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {}

  taches = new Tache()
  formGroup: any

  data: any
  materials: any
  contrats: any
  users: any
  id: any

  ngOnInit(): void {
    this.getData()
    this.initForm()
  }

  initForm() {
    this.id = this.route.snapshot.params.id

    this.formGroup = this.fb.group(
      {
        material_id: this.id,
        start_date: ['', [Validators.required]],
        end_date: ['', [Validators.required]],
        task_type_id: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(20)]],
        level: ['', [Validators.required]],
        contrat_id: [''],
        label: [''],
        users: ['', [Validators.required]],
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
      this.materials = this.data.items
    })

    this.serviceC.getData().subscribe((res) => {
      this.data = res
      this.contrats = this.data.items
    })

    this.serviceU.getData().subscribe((res) => {
      this.data = res
      this.users = this.data.items
    })
  }

  createtask() {
    console.log(this.formGroup.value)
    this.service.createTask(this.formGroup.value).subscribe(
      (_res) => {
        this.toastr.success('Tache planifiée avec succès !')
      },
      (_err) => {
        this.toastr.error('une erreur produite !', 'veuillez réessayer')
      },
    )
  }

  cansel() {
    this.router.navigateByUrl('/app/materials')
  }
}
