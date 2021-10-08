import { Materiel } from './../../Models/materiel'
import { TasksService } from './tasks.service'
import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-task',
  template: `
    <h2 id="titre"><b>TACHES</b></h2>
    <p>liste des tâches</p>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Données disponibles</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />

    <clr-datagrid>
      <clr-dg-action-bar></clr-dg-action-bar>

      <clr-dg-column [clrDgField]="'material.label'">MATERIEL</clr-dg-column>
      <clr-dg-column [clrDgField]="'start_date'">DATE</clr-dg-column>

      <clr-dg-row *clrDgItems="let task of tasks" [clrDgItem]="task">
        <clr-dg-action-overflow>
          <a (click)="updateData(task.id)">
            <button class="action-item">Modifier</button>
          </a>
          <a (click)="deleteData(task.id)">
            <button class="action-item">Supprimer</button>
          </a>
        </clr-dg-action-overflow>
        <clr-dg-cell>{{ task.material.label }}</clr-dg-cell>
        <clr-dg-cell>{{ task.start_date | date }}</clr-dg-cell>
        <!-- <clr-dg-cell>{{ task.start_date }}</clr-dg-cell>
              <clr-dg-cell>{{ task.status }}</clr-dg-cell> -->
      </clr-dg-row>

      <clr-dg-detail *clrIfDetail="let detail">
        <clr-dg-detail-header>
          DATE : {{ detail.start_date | date }}
        </clr-dg-detail-header>
        <br />
        <clr-dg-detail-body>
          <h2>Materiel</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Nom</th>
              <td>{{ detail.material.label }}</td>
            </tr>
            <tr>
              <th>Emplacement</th>
              <td>{{ detail.material.location.ref }}</td>
            </tr>
          </table>

          <h2>Groupe Prestataire</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>libelle</th>
              <td>{{ detail.task_group.label }}</td>
            </tr>
            <tr>
              <th>Contrat(reference)</th>
              <td>{{ detail.task_group.contrat_id }}</td>
            </tr>
          </table>

          <h2>Prestataire (s)</h2>
          <hr />
          <table class="table table-vertical">
            <tr>
              <th>Raison sociale (ou Nom)</th>
              <td>
                <span
                  class="label label-light-blue"
                  *ngFor="let book of detail.task_group.users"
                >
                  <span *ngFor="let us of book.user">
                    {{ us.social_reason }}
                  </span>
                </span>
              </td>
            </tr>
          </table>
        </clr-dg-detail-body>
      </clr-dg-detail>

      <clr-dg-footer>
        <clr-dg-pagination #pagination [clrDgPageSize]="10">
          <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]">
            Tâche par page
          </clr-dg-page-size>
          {{ pagination.firstItem + 1 }} - {{ pagination.lastItem + 1 }} ..
          {{ pagination.totalItems }} Tâches
        </clr-dg-pagination>
      </clr-dg-footer>
    </clr-datagrid>
  `,
  styles: [],
})
export class ListTaskComponent implements OnInit {
  constructor(private service: TasksService, private toastr: ToastrService) {}
  data: any
  tasks: any

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.tasks = this.data.items
      console.log(this.tasks)
    })
  }

  updateData(_id: any) {
    this.toastr.warning("En cours d'integration ... ")
  }

  deleteData(_id: any) {
    var res = confirm('Êtes-vous sûr de vouloir supprimer?')
    if (res) {
      this.service.deleteData(_id).subscribe(
        (res) => {
          this.getData()
        },
        (err) => {
          this.toastr.error('une erreur produite !', 'veuillez réessayer')
        },
      )
    }
  }
}
