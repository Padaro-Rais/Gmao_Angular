import { Component, OnInit } from '@angular/core'
import { HomeService } from './home.service'

@Component({
  selector: 'app-home',
  template: `
    <h6 id="titre1"></h6>
    <h2 id="titre"><b>STATISTIQUES</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Données</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />

    <table class="table table-vertical">
      <caption></caption>
      <tbody>
        <tr>
          <th>Materiels</th>
          <td>{{ etat.Material_nb }}</td>
          <td></td>
        </tr>

        <tr>
          <th>Prestataires</th>
          <td>
            {{ etat.Provider_nb }}
          </td>
          <td></td>
        </tr>
        <tr>
          <th>Taches</th>
          <td>{{ etat.Tasks_nb }}</td>
          <td></td>
        </tr>
        <tr>
          <th>Utilisateurs</th>
          <td>{{ etat.Users_nb }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(private service: HomeService) {}
  etat: any

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.etat = res
      console.log(this.etat)
    })
  }
}
