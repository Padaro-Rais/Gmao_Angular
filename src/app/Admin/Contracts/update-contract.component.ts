import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Contrat } from 'src/app/Models/contrat'
import { ContractService } from './contract.service'

@Component({
  selector: 'app-update-contract',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>CONTRAT DE MAINTENANCE</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3>Modification des informations</h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />

    <form novalidate (ngSubmit)="updateData()" #registerForm="ngForm">
      <div class="row">
        <div class="col">
          <label class="form-label">
            Reference
            <span class="requi">(*)</span>
          </label>
          <input
            class="form-control form-control-sm"
            type="text"
            name="ref"
            required
            [(ngModel)]="contrat.ref"
          />
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label">
            Valeur
            <span class="requi">(*)</span>
          </label>
          <input
            class="form-control form-control-sm"
            type="text"
            name="value"
            required
            [(ngModel)]="contrat.value"
          />
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
            class="form-control form-control-sm"
            type="text"
            name="start_date"
            required
            [(ngModel)]="contrat.start_date"
          />
        </div>

        <div class="col">
          <label for="exampleFormControlInput1" class="form-label">
            Fin
            <span class="requi">(*)</span>
          </label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="end_date"
            required
            [(ngModel)]="contrat.end_date"
          />
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
          [(ngModel)]="contrat.conditions"
          name="conditions"
          required
        ></textarea>
      </div>

      <br />
      <div class="col-12">
        <button
          class="btn btn-primary"
          type="submit"
          [disabled]="!registerForm.valid"
        >
          modifier
        </button>

        <button class="btn btn-primary" (click)="cansel()">
          RETOUR
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class UpdateContractComponent implements OnInit {
  id: any
  data: any
  id_ct: any

  contrat: Contrat = new Contrat()

  constructor(
    private service: ContractService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserById()
  }

  getUserById() {
    this.id = this.route.snapshot.params.id
    this.service.getUserById(this.id).subscribe((res) => {
      this.data = res
      this.contrat = this.data.item[0].contract
      this.id_ct = this.contrat.id
      console.log(this.contrat)
    })
  }

  updateData() {
    this.service.updateData(this.id_ct, this.contrat).subscribe(
      (res) => {
        this.router.navigateByUrl('/app/contracts')
      },
      (err) => {
        alert("une erreur s'est produite")
      },
    )
  }

  cansel() {
    this.router.navigateByUrl('/app/contracts')
  }
}
