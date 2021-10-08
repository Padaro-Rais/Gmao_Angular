import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-material',
  template: `
    <h2 id="titre"><b>MATERIELS</b></h2>
    <div class="clr-row" id="baniere">
      <div class="clr-col-3">
        <h3><b>Modification des information</b></h3>
      </div>
      <div class="clr-col-9"></div>
    </div>
    <br />
  `,
  styles: [],
})
export class UpdateMaterialComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

}
