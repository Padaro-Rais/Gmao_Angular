import { Component, OnInit } from '@angular/core';
import { CategorieService } from './categorie.service';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/Models/categorie';



@Component({
  selector: 'app-add-material-categorie',
  template: `
    <div class="main-container">

    </div>
  `,
  styles: [],
})
export class AddMaterialCategorieComponent implements OnInit {
  constructor(private service: CategorieService, private router: Router) {}

  categorie = new Categorie();

  ngOnInit(): void {}

  CreateGroupe() {
    this.service.createGroupe(this.categorie).subscribe((res) => {
      this.router.navigateByUrl('/materialCategorie');
    });
  }
}
