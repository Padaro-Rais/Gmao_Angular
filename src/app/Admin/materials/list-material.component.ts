import { MaterialService } from './material.service'
import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-material',
  template: `
    <h2 id="titre"><b>MATERIELS</b></h2>
    <p>liste des materiels</p>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Données disponibles</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />

    <clr-datagrid>
      <clr-dg-action-bar>
        <div class="btn-group">
          <a routerLink="/app/add-Material">
            <button type="button" class="btn btn-sm btn-secondary">
              <clr-icon shape="plus"></clr-icon>
              Nouveau
            </button>
          </a>
        </div>
      </clr-dg-action-bar>

      <clr-dg-column [clrDgField]="'label'">LIBELLE</clr-dg-column>
      <clr-dg-column [clrDgField]="'group.label'">GROUPE</clr-dg-column>

      <clr-dg-row
        *clrDgItems="let material of materials"
        [clrDgItem]="material"
      >
        <clr-dg-action-overflow>
          <a (click)="updateData(material.id)">
            <button class="action-item">Modifier</button>
          </a>
          <a (click)="deleteData(material.id)">
            <button class="action-item">Supprimer</button>
          </a>
        </clr-dg-action-overflow>

        <clr-dg-cell>{{ material.label }}</clr-dg-cell>
        <clr-dg-cell>{{ material.group.label }}</clr-dg-cell>
      </clr-dg-row>

      <clr-dg-detail *clrIfDetail="let detail">
        <clr-dg-detail-header>Details Materiel</clr-dg-detail-header>
        <clr-dg-detail-body>
          <div class="clr-row">
            <div class="clr-col-sm-12 clr-col-md-6">
              <hr />
              <a routerLink="/app/add-Task/{{ detail.id }}">
                <clr-button-group class="btn-primary">
                  <clr-button>Nouvelle tâche</clr-button>
                </clr-button-group>
              </a>
            </div>
            <div class="clr-col-sm-12 clr-col-md-6">
              <div class="clr-row">
                <div class="clr-col-lg-12 clr-col-12">
                  <a href="javascript:void(0)" class="card clickable">
                    <div class="card-img">
                      <img src="{{ detail.img }}" />
                    </div>
                    <div class="card-block">
                      <p class="card-text">...</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <h2>Materiel</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Nom</th>
              <td>{{ detail.label }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ detail.description }}</td>
            </tr>
          </table>

          <h2>Garentie</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Durée</th>
              <td>{{ detail.guarantee.duration }} Jours</td>
            </tr>
            <tr>
              <th>Date d'expiration</th>
              <td>{{ detail.guarantee.expired }}</td>
            </tr>
          </table>

          <h2>Groupe</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Libelle</th>
              <td>{{ detail.group.label }}</td>
            </tr>
          </table>

          <h2>Categorie</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Libelle</th>
              <td>{{ detail.category.label_cat }}</td>
            </tr>
          </table>

          <h2>Emplacement</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Reference</th>
              <td>{{ detail.location.ref }}</td>
            </tr>
            <tr>
              <th>Adresse physique</th>
              <td>{{ detail.location.physical_address }}</td>
            </tr>
            <tr>
              <th>Quartier</th>
              <td>{{ detail.location.quartier }}</td>
            </tr>

            <tr>
              <th>Ville</th>
              <td>{{ detail.location.ville }}</td>
            </tr>

            <tr>
              <th>Pays</th>
              <td>{{ detail.location.pays }}</td>
            </tr>
          </table>

          <h2>Details Amortissement</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Date d'aquisition</th>
              <td>{{ detail.details.supplied_at | date }}</td>
            </tr>
            <tr>
              <th>Prix d'acquisition</th>
              <td>{{ detail.details.price }}</td>
            </tr>
            <tr>
              <th>Durée de vie</th>
              <td>{{ detail.details.material_lifetime }} jours</td>
            </tr>
          </table>

          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Etat</th>
              <td>{{ detail.details.state }}</td>
            </tr>
            <tr>
              <th>Status courant</th>
              <td>{{ detail.details.current_status }}</td>
            </tr>
          </table>
        </clr-dg-detail-body>
      </clr-dg-detail>

      <clr-dg-footer>
        <clr-dg-pagination #pagination [clrDgPageSize]="10">
          <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">
            Materiels par page
          </clr-dg-page-size>
          {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} ..
          {{ pagination.totalItems }} Materiels
        </clr-dg-pagination>
      </clr-dg-footer>
    </clr-datagrid>
  `,

  styles: [],
})
export class ListMaterialComponent implements OnInit {
  constructor(
    private service: MaterialService,
    private toastr: ToastrService,
  ) {}

  data: any
  materials: any

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.materials = this.data.items
      console.log(this.materials)
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

  updateData(_id: any) {
    this.toastr.warning("En cours d'integration ... ")
  }

  Consulter() {
    alert('helloooo')
  }
}
