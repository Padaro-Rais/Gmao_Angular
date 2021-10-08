import { Contrat } from './../../Models/contrat'
import { ContractService } from './contract.service'
import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-contract',
  template: `
    <h2 id="titre"><b>CONTRATS DE MAINTENANCE</b></h2>
    <p>liste des Contrats de maintenance</p>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Données disponibles</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />

    <clr-dg-action-bar>
      <div class="btn-group">
        <a routerLink="/app/add-Contract">
          <button type="button" class="btn btn-sm btn-secondary">
            <clr-icon shape="plus"></clr-icon>
            Nouveau
          </button>
        </a>
      </div>
    </clr-dg-action-bar>

    <clr-datagrid>
      <clr-dg-column [clrDgField]="'contract.ref'">REFERENCE</clr-dg-column>
      <clr-dg-column [clrDgField]="'material.label'">MATERIEL</clr-dg-column>

      <clr-dg-row *clrDgItems="let contrat of contrats" [clrDgItem]="contrat">
        <clr-dg-action-overflow>
          <a routerLink="/app/update-contract/{{ contrat.id }}">
            <button class="action-item">Modifier</button>
          </a>
          <a (click)="deleteData(contrat.id)">
            <button class="action-item">Supprimer</button>
          </a>
        </clr-dg-action-overflow>

        <clr-dg-cell>{{ contrat.contract.ref }}</clr-dg-cell>
        <clr-dg-cell>{{ contrat.material.label }}</clr-dg-cell>
      </clr-dg-row>

      <clr-dg-detail *clrIfDetail="let detail">
        <clr-dg-detail-header>
          <table class="table">
            <thead>
              <tr>
                <th>Contrat N°{{ detail.contract.id }}</th>
                <th>Debut :{{ detail.contract.start_date | date }}</th>
                <th>Fin :{{ detail.contract.end_date | date }}</th>
                <th>Valeur :{{ detail.contract.value }}</th>
              </tr>
            </thead>
          </table>
        </clr-dg-detail-header>
        <br />
        <clr-dg-detail-body>
          <h2>Materiel</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Libelle</th>
              <td>{{ detail.material.label }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ detail.material.description }}</td>
            </tr>
          </table>

          <h2>Prestataire</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Raison social</th>
              <td>{{ detail.provider.social_reason }}</td>
            </tr>
            <tr>
              <th>Addresse</th>
              <td>{{ detail.provider.address }}</td>
            </tr>
            <tr>
              <th>Téléphone</th>
              <td>{{ detail.provider.phone_number }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ detail.provider.email }}</td>
            </tr>
          </table>

          <h2>CONDITIONS</h2>
          <hr />
          <p>{{ detail.contract.conditions }}</p>
        </clr-dg-detail-body>
      </clr-dg-detail>

      <clr-dg-footer>
        <clr-dg-pagination #pagination [clrDgPageSize]="10">
          <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">
            Contrats par page
          </clr-dg-page-size>
          {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} ..
          {{ pagination.totalItems }} Contrats
        </clr-dg-pagination>
      </clr-dg-footer>
      <!-- ... -->
    </clr-datagrid>
  `,
  styles: [],
})
export class ListContractComponent implements OnInit {
  data: any
  contrats: any

  constructor(
    private service: ContractService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.contrats = this.data.items
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
}
