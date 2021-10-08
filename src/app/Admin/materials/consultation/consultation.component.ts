import { Component, OnInit } from '@angular/core'
import { MaterialService } from '../material.service'

@Component({
  selector: 'app-consultation',
  template: `
    <h2 id="titre"><b>MATERIELS</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>CONSULTATION DE L'ETAT D'UN EQUIPEMENT</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />
    <form (ngSubmit)="Consulter()">
      <div class="clr-row">
        <div class="clr-col">
          <clr-combobox-container>
            <label>Materiel</label>
            <clr-combobox name="myState" required disabled="disabled">
              <clr-options>
                <clr-option
                  *clrOptionItems="let state of materials; field: 'label'"
                  [clrValue]="state"
                >
                  <clr-icon
                    shape="world"
                    role="img"
                    aria-label="World is turning"
                  ></clr-icon>
                  {{ state.label }}
                  <clr-icon
                    shape="sun"
                    role="img"
                    aria-label="Sun is shining"
                  ></clr-icon>
                </clr-option>
              </clr-options>
            </clr-combobox>
            <clr-control-helper>Selectioner l'equipement</clr-control-helper>
            <clr-control-error>There was an error</clr-control-error>
          </clr-combobox-container>
        </div>
        <div class="clr-col">
          <clr-input-container>
            <label>Date</label>
            <input clrInput type="date" name="supplied_at" required />
            <clr-control-error>Requis</clr-control-error>
          </clr-input-container>
        </div>
        <div class="clr-col">
          <br />
          <button class="btn btn-primary" type="submit">Consulter</button>
        </div>
      </div>
    </form>
    <br />
    <br />

    <table class="table">
      <caption>
        <div class="alert alert-warning">
          <div class="alert-items">
            <div class="alert-item static">
              <div class="alert-icon-wrapper">
                <cds-icon
                  class="alert-icon"
                  shape="exclamation-circle"
                ></cds-icon>
              </div>
              <span class="alert-text">
                Aucune recherche trouver
              </span>
            </div>
          </div>
        </div>
      </caption>
    </table>
  `,
  styles: [],
})
export class ConsultationComponent implements OnInit {
  constructor(private service: MaterialService) {}

  data: any
  materials: any

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.data = res
      this.materials = this.data.items
    })
  }

  Consulter() {
    alert('Non fonctionnelle pour le momment')
  }
}
