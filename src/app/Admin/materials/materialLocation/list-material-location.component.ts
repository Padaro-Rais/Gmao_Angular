import { RouterLink } from '@angular/router'
import { LocationService } from './location.service'
import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-material-location',
  template: `
    <h6 id="titre1">Configuration</h6>
    <h2 id="titre"><b>ADRESSE MATERIELS</b></h2>
    <p>liste des emplacements du materiel</p>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Données disponibles</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />

    <a routerLink="/app/add-Location">
      <button type="button" class="btn btn-sm btn-secondary">
        <clr-icon shape="plus"></clr-icon>
        Nouveau
      </button>
    </a>
    <br />
    <clr-datagrid>
      <clr-dg-column [clrDgField]="'ref'">Reference</clr-dg-column>
      <clr-dg-column [clrDgField]="'physical_address'">
        Addresse physique
      </clr-dg-column>
      <clr-dg-column [clrDgField]="'location_label'">Structure</clr-dg-column>
      <clr-dg-column [clrDgField]="'quartier'">Quartier</clr-dg-column>
      <clr-dg-column [clrDgField]="'ville'">Ville</clr-dg-column>
      <clr-dg-column [clrDgField]="'pays'">Pays</clr-dg-column>

      <clr-dg-row *clrDgItems="let location of locations">
        <clr-dg-action-overflow>
          <a routerLink="/app/update-location/{{ location.id }}">
            <button class="action-item">Modifier</button>
          </a>
          <a (click)="deleteData(location.id)">
            <button class="action-item">Supprimer</button>
          </a>
        </clr-dg-action-overflow>

        <clr-dg-cell>{{ location.ref }}</clr-dg-cell>
        <clr-dg-cell>{{ location.physical_address }}</clr-dg-cell>
        <clr-dg-cell>{{ location.location_label }}</clr-dg-cell>
        <clr-dg-cell>{{ location.quartier }}</clr-dg-cell>
        <clr-dg-cell>{{ location.ville }}</clr-dg-cell>
        <clr-dg-cell>{{ location.pays }}</clr-dg-cell>
      </clr-dg-row>

      <clr-dg-footer>
        <clr-dg-pagination #pagination [clrDgPageSize]="10">
          <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">
            Adresses par page
          </clr-dg-page-size>
          {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} ..
          {{ pagination.totalItems }} Adresses
        </clr-dg-pagination>
      </clr-dg-footer>
    </clr-datagrid>
  `,
  styles: [],
})
export class ListMaterialLocationComponent implements OnInit {
  constructor(
    private service: LocationService,
    private toastr: ToastrService,
  ) {}
  data: any
  locations: any

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.locations = this.data.items
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
