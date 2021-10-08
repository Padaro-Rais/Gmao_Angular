import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from 'src/app/Models/provider';
import { ProviderService } from './provider.service';

@Component({
  selector: 'app-add-material-provider',
  template: `
     <div class="main-container">

    </div>
  `,
  styles: [],
})
export class AddMaterialProviderComponent implements OnInit {
  constructor(private service: ProviderService, private router: Router) { }

  provider = new Provider();

  ngOnInit(): void {}

  createProvider() {

    this.service.createProvider(this.provider).subscribe((res) =>{
      this.router.navigateByUrl('/materialProvider');
   })
  }
}
