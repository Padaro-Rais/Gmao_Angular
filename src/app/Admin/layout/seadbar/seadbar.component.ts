import { Materiel } from './../../../Models/materiel'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-seadbar',
  template: `
    <a
      clrVerticalNavLink
      routerLinkActive="active"
      routerLink="/app/statistiques"
    >
      <clr-icon shape="certificate" clrVerticalNavIcon></clr-icon>
      STATISTIQUES
    </a>

    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="tools" clrVerticalNavIcon></clr-icon>
      MATERIELS
      <clr-vertical-nav-group-children>
        <a
          clrVerticalNavLink
          routerLink="/app/materials"
          routerLinkActive="active"
        >
          Liste des Materiels
        </a>
        <a
          clrVerticalNavLink
          routerLink="/app/add-Material"
          routerLinkActive="active"
        >
          Nouveau Materiel
        </a>
        <!-- <a
            clrVerticalNavLink
            routerLink="/app/consultation"
            routerLinkActive="active"
          >
            Consultation
          </a> -->
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="note" clrVerticalNavIcon></clr-icon>
      CONTRATS
      <clr-vertical-nav-group-children>
        <a
          clrVerticalNavLink
          routerLink="/app/contracts"
          routerLinkActive="active"
        >
          Liste des contrats
        </a>
        <a
          clrVerticalNavLink
          routerLink="/app/add-Contract"
          routerLinkActive="active"
        >
          Nouveau contrat
        </a>
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="tasks" clrVerticalNavIcon></clr-icon>
      TACHES
      <clr-vertical-nav-group-children>
        <a clrVerticalNavLink routerLink="/app/tasks" routerLinkActive="active">
          Liste des taches
        </a>
        <!-- <a
            clrVerticalNavLink
            routerLink="/app/add-Task"
            routerLinkActive="active"
          >
            Nouvelle tache
          </a> -->
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="bolt" clrVerticalNavIcon></clr-icon>
      CONFIGURATIONS
      <clr-vertical-nav-group-children>
        <a
          routerLink="/app/materialGroupe"
          routerLinkActive="active"
          clrVerticalNavLink
        >
          Groupes materiels
        </a>
        <a
          routerLink="/app/materialCategorie"
          routerLinkActive="active"
          clrVerticalNavLink
        >
          Catégories Materiels
        </a>

        <a
          routerLink="/app/materialLocation"
          routerLinkActive="active"
          clrVerticalNavLink
        >
          Localisation Materiels
        </a>

        <a
          routerLink="/app/materialProvider"
          routerLinkActive="active"
          clrVerticalNavLink
        >
          Prestataires
        </a>

        <a *ngIf="permission"  routerLink="/app/users" routerLinkActive="active" class="nav-link">
          Utilisateurs
        </a>
        
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
  `,
  styles: [],
})
export class SeadbarComponent implements OnInit {
  constructor() {}

  permission: boolean = false



  ngOnInit(): void {

    if( localStorage.getItem('permission') == '1'){
          this.permission =true
    }
  }
}
