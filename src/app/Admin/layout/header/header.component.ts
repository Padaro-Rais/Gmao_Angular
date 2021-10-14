import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  template: `
    <header class="header header-6" id="header">
      <div class="branding">
        <a href="..." class="nav-link">
          <!-- <clr-icon shape="my-custom-shape"></clr-icon> -->
          <span class="title" id="app">LGMAO</span>
        </a>
      </div>
      <div class="header-nav">
        <a
          routerLink="/app/dashbord"
          routerLinkActive="active"
          class="nav-link nav-text"
        >
        <span id="bord">TABLEAU DE BORD</span>
        </a>
      </div>

      <div class="header-actions">
         <button type="button" (click)="logout()" id="sd" class="btn btn-primary btn-sm">Se déconnecter</button>
      </div>
    </header>
  `,
  styles: [


  ],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear()
    this.route.navigateByUrl('/auth/login')
  }
}
