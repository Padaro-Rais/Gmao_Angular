import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashbord',
  template: `
    <h2 id="titre"><b>GMAO</b></h2>
    <p>
      Gérer les informations relatif a la gestion de maintenance assistéé par
      ordinateur
    </p>
    <br />

    <div class="clr-row">
      <div class="clr-col">
        <div class="clr-row">
          <div class="clr-col-lg-12 clr-col-md-8 clr-col-12">
            <div class="card">
              <div class="card-header">MATERIELS</div>
              <div class="card-block">
                <div class="card-text">Gestions du materels</div>
              </div>
              <div class="card-footer">
                <a routerLink="/app/materials">
                  <button type="button" class="btn btn-icon" aria-label="home">
                    <clr-icon shape="folder-open"></clr-icon>
                    PARCOURIR
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clr-col">
        <div class="clr-row">
          <div class="clr-col-lg-12 clr-col-md-8 clr-col-12">
            <div class="card">
              <div class="card-header">STATISTIQUES</div>
              <div class="card-block">
                <div class="card-text">
                  Retrouvez les données recapitulatives sur la gestion de
                  maintenance assistée par ordinateur.
                </div>
              </div>
              <div class="card-footer">
                <a routerLink="/app/statistiques">
                  <button type="button" class="btn btn-icon" aria-label="home">
                    <clr-icon shape="folder-open"></clr-icon>
                    PARCOURIR
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clr-col">
        <div class="clr-row">
          <div class="clr-col-lg-12 clr-col-md-8 clr-col-12">
            <div class="card">
              <div class="card-header">TACHES</div>
              <div class="card-block">
                <div class="card-text">Palnifications des taches</div>
              </div>
              <div class="card-footer">
                <a routerLink="/app/tasks">
                  <button type="button" class="btn btn-icon" aria-label="home">
                    <clr-icon shape="folder-open"></clr-icon>
                    PARCOURIR
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br>  <br>  <br>

    <div class="clr-row">
      <div class="clr-col">
        <div class="clr-row">
          <div class="clr-col-lg-12 clr-col-md-8 clr-col-12">
            <div class="card">
              <div class="card-header">GROUPES</div>
              <div class="card-block">
                <div class="card-text">
                  Groupe de materiels identiques
                </div>
              </div>
              <div class="card-footer">
                <a routerLink="/app/materialGroupe">
                  <button type="button" class="btn btn-icon" aria-label="home">
                    <clr-icon shape="folder-open"></clr-icon>
                    PARCOURIR
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clr-col">
        <div class="clr-row">
          <div class="clr-col-lg-12 clr-col-md-8 clr-col-12">
            <div class="card">
              <div class="card-header">CATERORIES</div>
              <div class="card-block">
                <div class="card-text">Categories de materiels</div>
              </div>
              <div class="card-footer">
                <a routerLink="/app/materialCategorie">
                  <button type="button" class="btn btn-icon" aria-label="home">
                    <clr-icon shape="folder-open"></clr-icon>
                    PARCOURIR
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clr-col">
        <div class="clr-row">
          <div class="clr-col-lg-12 clr-col-md-8 clr-col-12">
            <div class="card">
              <div class="card-header">EMPLACEMENT</div>
              <div class="card-block">
                <div class="card-text">Emplacemens des materiels</div>
              </div>
              <div class="card-footer">
                <a routerLink="/app/materialProvider">
                  <button type="button" class="btn btn-icon" aria-label="home">
                    <clr-icon shape="folder-open"></clr-icon>
                    PARCOURIR
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>  <br>


    <div class="clr-row">
      <div class="clr-col" *ngIf="permission">
        <div class="card">
          <div class="card-header">UTILISATEURS</div>
          <div class="card-block">
            <div class="card-text">Utilisateurs du systèmes</div>
          </div>
          <div class="card-footer">
            <a routerLink="/app/users">
              <button type="button" class="btn btn-icon" aria-label="home">
                <clr-icon shape="folder-open"></clr-icon>
                PARCOURIR
              </button>
            </a>
          </div>
        </div>
      </div>
      <div class="clr-col">
        <div class="card">
          <div class="card-header">CONTRAT DE MAINTENANCE</div>
          <div class="card-block">
            <div class="card-text">
              Gestion des contrats de maintenances
            </div>
          </div>
          <div class="card-footer">
            <a routerLink="/app/contracts">
              <button type="button" class="btn btn-icon" aria-label="home">
                <clr-icon shape="folder-open"></clr-icon>
                PARCOURIR
              </button>
            </a>
          </div>
        </div>
      </div>
      <div class="clr-col">
        <div class="card">
          <div class="card-header">FOURNISSEURS</div>
          <div class="card-block">
            <div class="card-text">Fournisseurs du materiels</div>
          </div>
          <div class="card-footer">
            <a routerLink="/app/materialProvider">
              <button type="button" class="btn btn-icon" aria-label="home">
                <clr-icon shape="folder-open"></clr-icon>
                PARCOURIR
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class DashbordComponent implements OnInit {
  constructor() {}

  permission : boolean = false

  ngOnInit(): void {

    if( localStorage.getItem('permission') == '1'){
      this.permission =true
    }
  }
}
