import { Component, OnInit } from '@angular/core';
import { ServiceGroupeService } from './service-groupe.service';
import { Router } from '@angular/router';
import { Groupe } from 'src/app/Models/groupe';

@Component({
  selector: 'app-add-material-group',
  template: `
    <div class="main-container">
    
    </div>
  `,
  styles: [],
})
export class AddMaterialGroupComponent implements OnInit {
  constructor(private service: ServiceGroupeService, private router: Router) {}

  groupe = new Groupe();

  ngOnInit(): void {}

  CreateGroupe() {

    this.service.createGroupe(this.groupe).subscribe((res) => {
      this.router.navigateByUrl('/materialGroupe');
    });

  }
}
