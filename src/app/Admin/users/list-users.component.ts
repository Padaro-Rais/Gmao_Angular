import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-users',
  template: `

          <h6 id="titre1">Configuration</h6>
          <h2 id="titre"><b>UTILISATEURS SYSTEME</b></h2>
          <p>liste des utilisateurs</p>
          <div class="clr-row" id="baniere">
            <div class="clr-col-3">
              <h3><b>Données disponibles</b></h3>
            </div>
            <div class="clr-col-9"></div>
          </div>
          <br />

          <clr-dg-action-bar>
            <div class="btn-group">
              <a routerLink="/app/add-user">
                <button type="button" class="btn btn-sm btn-secondary">
                  <clr-icon shape="plus"></clr-icon> Nouveau
                </button>
              </a>
            </div>
          </clr-dg-action-bar>

          <clr-datagrid>
            <!-- <clr-dg-column>Image</clr-dg-column> -->
            <clr-dg-column [clrDgField]="'lastname'">Nom</clr-dg-column>
            <clr-dg-column [clrDgField]="'firstname'">Prenoms</clr-dg-column>
            <clr-dg-column [clrDgField]="'email'">Email</clr-dg-column>
            <clr-dg-column [clrDgField]="'role.name'">Status</clr-dg-column>

            <clr-dg-row *clrDgItems="let user of users" [clrDgItem]="user">
              <clr-dg-action-overflow>
                <a routerLink="/app/update-user/{{ user.id }}"
                  ><button class="action-item">Modifier</button></a
                >
                <a (click)="deleteData(user.id)"
                  ><button class="action-item">Supprimer</button></a
                >
              </clr-dg-action-overflow>
              <!-- <clr-dg-cell
                ><img src="{{ user.image }}" width="80" height="80"
              /></clr-dg-cell> -->
              <clr-dg-cell>{{ user.lastname }}</clr-dg-cell>
              <clr-dg-cell>{{ user.firstname }}</clr-dg-cell>
              <clr-dg-cell>{{ user.email }}</clr-dg-cell>
              <clr-dg-cell>{{ user.role.name }}</clr-dg-cell>
            </clr-dg-row>

            <clr-dg-detail *clrIfDetail="let detail">
              <clr-dg-detail-header>
                Details Utilisateurs
              </clr-dg-detail-header>
              <br/>

              <div class="clr-row">
                  <div class="clr-col-sm-12 clr-col-md-6">
                    <hr />

                  </div>
                  <div >
                    <div class="clr-row">
                      <div class="clr-col-lg-8 clr-col-5">
                        <a href="javascript:void(0)" class="card clickable">
                          <div class="card-img">
                            <img src="{{ detail.image }}" />
                          </div>
                          <div class="card-block">
                            <p class="card-text">Profile</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              <clr-dg-detail-body>
                <h2>DETAILS</h2>
                <hr />

                <table class="table table-vertical">
                  <tr>
                    <th>Nom</th>
                    <td>{{ detail.lastname }} {{ detail.firstname }}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>Adresse</th>
                    <td>{{ detail.address }}</td>
                  </tr>
                  <tr>
                    <th>Date de naissance</th>
                    <td>{{ detail.birthday }}</td>
                  </tr>
                  <tr>
                    <th>username</th>
                    <td>{{ detail.username }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ detail.email }}</td>
                  </tr>
                  <tr>
                    <th>Telephone</th>
                    <td>{{ detail.phone_number }}</td>
                  </tr>
                  <tr>
                    <th>Role</th>
                    <td>{{ detail.role.name }}</td>
                  </tr>

                  <tbody></tbody>
                </table>
              </clr-dg-detail-body>
            </clr-dg-detail>

            <clr-dg-footer>
              <clr-dg-pagination #pagination [clrDgPageSize]="10">
                <clr-dg-page-size [clrPageSizeOptions]="[10, 20, 50, 100]"
                  >Utilisateurs par page</clr-dg-page-size
                >
                {{ pagination.firstItem + 1 }} -
                {{ pagination.lastItem + 1 }} ..
                {{ pagination.totalItems }} utilisateurs
              </clr-dg-pagination>
            </clr-dg-footer>
          </clr-datagrid>

  `,
  styles: [],
})
export class ListUsersComponent implements OnInit {
  data: any;
  users: any;

  constructor(private service: UsersService ,private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.service.getUser().subscribe((res) => {
      this.data = res;
      this.users = this.data.items;
      console.log(" les users sont","\n",this.users);
    });
  }

  deleteData(_id: any) {
 
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if(res){

      this.service.deleteData(_id).subscribe((res) => {
        this.toastr.success('suppression reuissi !');
        this.getUser();
     },
      (err) => {
        this.toastr.error('une erreur produite !','veuillez réessayer');
      });
    }

  }
}
