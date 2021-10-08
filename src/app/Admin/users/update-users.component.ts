import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-update-users',
  template: `
    <div class="main-container">
      <app-header></app-header>
      <div class="content-container">
        <nav class="sidenav">
          <app-seadbar></app-seadbar>
        </nav>
        <div class="content-area" id="home">

        <h6 id="titre1" >Configuration</h6>
          <h2 id="titre"><b>UTILISATEURS SYSTEME</b></h2>
          <p>Modification des informations</p>
          <div class="clr-row" id="baniere">
            <div class="clr-col-3">
              <h3><b>Données disponibles</b></h3>
            </div>
            <div class="clr-col-9">
            </div>
          </div><br>

        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class UpdateUsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
