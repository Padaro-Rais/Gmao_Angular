import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  template: `
    <header class="header header-6" id="header">
      <div class="branding">
        <a href="..." class="nav-link">
          <!-- <clr-icon shape="my-custom-shape"></clr-icon> -->
          <span class="title">LGMAO</span>
        </a>
      </div>
      <div class="header-nav">
        <a
          routerLink="/dashbord"
          routerLinkActive="active"
          class="nav-link nav-text"
        >
          TABLEAU DE BORD
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
